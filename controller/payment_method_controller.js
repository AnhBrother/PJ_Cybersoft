const e = require("express");
const { db } = require("../config/utils");

const getPaymentMethod = async (req, res) => {
    try {
        const data = req.params.getPaymentMethod
        if (data == null) {
            res.status(400).send("Key wrong")
        }else {
            const get_data = await db.payment_method.findUnique({
                where:{
                    name: data
                }
            })
            if (get_data != null) {
                res.status(200).send(get_data)
            } else {
                res.status(201).send("Payment method not exist")
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const addPaymentMethod = async (req, res) => {
    try {
        const name = req.body.name
        if (name == undefined) {
            res.status(500).send("Key wrong")
        }else{
            const paymentMethod_exist = await db.payment_method.findUnique({
                where: {
                    name: name,
                },
                select:{
                    name: true,
                }
            })
    
            if (paymentMethod_exist != null) {
                res.status(400).send("Payment Method existed")
            }else{
                const data = await db.payment_method.create({
                    data: {
                        name: name
                    }
                })
                if (data != null) {
                    res.status(200).send("Add sucess")
                }else{
                    res.status(201).send("Add error")
                }
            }
        }                    
    } catch (error) {
        res.status(500).send(error)
    }
}

const updPaymentMethod = async (req, res) => {
    try {
        const name = req.body

        if (name.old_name == undefined || name.new_name == undefined) {
            res.status(400).send("Key wrong")
        } else {
            const data =  await db.payment_method.updateMany({
                where:{
                    name: name.old_name
                },
                data:{
                    name: name.new_name
                }
            })

            if (data.count != 0) {
                res.status(200).send('Update payment method success')
            }else{
                res.status(201).send('Data not exist')
            }
        }
    } catch (error) {
        res.status(500).send(error)
    } 
}

const delPaymentMethod = async (req, res) => {
    try {
        const name = req.body.name
        if (name == undefined) {
            res.status(400).send("Key wrong")
        }
        const data = await db.payment_method.delete({
            where: {
              name: name,
            }
        })
        
        if (data.count != 0) {
            res.status(200).send('Delete payment method success')
        }else{
            res.status(201).send('Data not exist')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getPaymentMethod,
    addPaymentMethod,
    updPaymentMethod,
    delPaymentMethod
}