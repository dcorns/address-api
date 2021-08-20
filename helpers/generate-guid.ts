/**
 * generate-guid
 * Created by dcorns on 8/19/21
 * Copyright © 2021 Dale Corns
 */
import crypto from 'crypto';
const generateGuid = (address) => {
    return crypto.createHmac('sha256', 'NormallyDoNotPutInRepo23%we900p')
        .update(address)
        .digest('hex');
};
export default generateGuid;