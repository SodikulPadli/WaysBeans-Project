const { user, transaction, product, cart, detailtransaction } = require('../../models');

exports.addTransaction = async (req, res) => {
  try {
    data = {
      idUser: req.user.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      orderQuantity: req.body.orderQuantity,
      price: req.body.price,
      status: 'pending',
    };

    let datatransaction = await transaction.create(data);
    const transactionProducts = req.body.product.map((product) => {
      return {
        idTransaction: datatransaction.id,
        idProduct: product.idProduct,
        orderQuantity: product.orderQuantity,
      };
    });
    await detailtransaction.bulkCreate(transactionProducts);

    await cart.destroy({
      where: {
        idUser: req.user.id,
      },
    });

    res.send({
      status: 'pending',
      message: 'Pending transaction payment gateway',
      id: datatransaction.id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    let data = await transaction.findAll({
      include: [
        {
          model: product,
          as: 'product',
          through: {
            model: detailtransaction,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'status'],
          },
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    data = data.map((item) => {
      return {
        ...item,
        product: {
          ...item.product,
          image: process.env.PATH_FILE + `${item?.product?.image}`,
        },
      };
    });

    res.send({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
exports.getTransaction = async (req, res) => {
  try {
    const idUser = req.user.id;
    let data = await transaction.findAll({
      where: {
        idUser,
      },
      attributes: {
        exclude: ['updatedAt', 'idUser', 'idProduct'],
      },
      include: [
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'status'],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));
    data = data.map((item) => {
      return {
        ...item,
        product: {
          ...item.product,
          image: process.env.PATH_FILE + `${item?.product?.image}`,
        },
      };
    });

    res.send({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await detailtransaction.destroy({
      where: {
        idTransaction: id,
      },
    });

    await transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: 'success',
      message: `Delete category id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      attechment: req.file.filename,
      status: 'Waiting Approval',
      idUser: req.user.id,
    };

    await transaction.update(data, {
      where: {
        id,
      },
    });

    let dataTransaction = await transaction.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },

      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    dataTransaction = JSON.parse(JSON.stringify(dataTransaction));
    res.send({
      status: 'success...',
      data: {
        dataTransaction,
        attechment: process.env.PATH_FILE + dataTransaction.attechment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateTransactionAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      status: req.body.status,
    };

    await transaction.update(data, {
      where: {
        id,
      },
    });

    res.status(200).send({
      status: 'success',
      data: {
        id,
        data,
        image: req?.file?.filename,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getDetailTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transaction.findAll({
      where: {
        id,
      },
      include: [
        {
          model: product,
          as: 'product',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'status'],
          },
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
