/**
 * addressRouter
 * Created by dcorns on 8/16/21
 * Copyright © 2021 Dale Corns
 */
import express from 'express';
import getAddresses from '../controllers/getAddresses';
import postAddress from '../controllers/postAddress';
import putAddress from '../controllers/putAddress';
import deleteAddress from '../controllers/deleteAddress';

const routes = () => {
    const addressRouter = express.Router();

    addressRouter.route('/address')
        .post(async (req, res) => {
            const response = await postAddress(req.body);
            if(response.err) return res.send(response.err);
            return res.json(response.data);
        })
        .get(async (req, res) => {
            console.log(req.query);
            const q = (req.query.s && req.query.p) ? req.query: null;
            const response = await getAddresses(null, q);
            if(response.err) return res.send(response.err);
            return res.json(response.data);
        });
    addressRouter.route('/address/:id')
        .put(async (req, res) => {
            const response = await putAddress(req.params.id, req.body);
            if(response.err) return res.send(response.err);
            return res.json(response.data);
        })
        .delete(async (req, res) => {
            const response = await deleteAddress(req.params.id);
            if(response.err) return res.send(response.err);
            return res.json(response.data);
        })
        .get(async (req, res) => {
            const response = await getAddresses(req.params.id, req.query);
            if(response.err) return res.send(response.err);
            return res.json(response.data);
        });
    return addressRouter;
}
export default routes();