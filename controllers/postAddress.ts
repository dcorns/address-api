/**
 * postAddress
 * Created by dcorns on 8/16/21
 * Copyright © 2021 Dale Corns
 */

const path = require('path');
const fs = require('fs');
import generateGuid from '../helpers/generate-guid';

const postAddress = async (item) => {
    const dataPath = path.resolve('./', 'db.json');
    try{
        const dataFile = fs.readFileSync(dataPath);
        const data = JSON.parse(dataFile);
        if(!data) {
            return {err: 'no data to insert into', data: null}
        }else{
            //Simple id method
            // const id = (data.reduce((accumulator, currentValue) => {
            //     const currentId = parseInt(currentValue.id, 10);
            //     return currentId > accumulator ? currentId : accumulator;
            // }, 0) + 1).toString();
            //better way to deal with ids
            const id = generateGuid(item.line1 + item.line2 + item.city + item.state + item.zip);
            //todo: add search of existing ids to make sure that the address does not already exist before adding
            const newRecord = {...item, id};
            const dataUpdated = [newRecord, ...data];
            fs.writeFileSync(dataPath, JSON.stringify(dataUpdated, null, 2));
            return {err:null, data: dataUpdated};
        }
    }catch(e){
        console.error('postAddress', e);
        return {err: e, data: null};
    }
};
export default postAddress;