/**
 * deleteAddress
 * Created by dcorns on 8/16/21
 * Copyright © 2021 Dale Corns
 */
const path = require('path');
const fs = require('fs');

const deleteAddress = async (id) => {
    const dataPath = path.resolve('./', 'db.json');

    try{
        const dataFile = fs.readFileSync(dataPath);
        const data = JSON.parse(dataFile);
        console.dir(id);
        if(!data) {
            console.log(`deleteAddress failed to retrieve data`);
            return {error:'error loading data', data: null};
        }else{
            const dataUpdated = data.filter((rec: any) => rec.id !== id);
            fs.writeFileSync(dataPath, JSON.stringify(dataUpdated, null, 2));
            return {err: null, data: dataUpdated};
        }
    }catch(e){
        console.error('deleteAddress', e);
        return {err: e, data: null};
    }
};
export default deleteAddress;