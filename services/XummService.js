import Axios from 'axios';
import jwt from 'jsonwebtoken';
import { apiConfig } from "../env";
import { useAuthStore } from "../store";

Axios.defaults.withCredentials = false;
Axios.defaults.headers.common['Content-Type'] = 'application/json';
Axios.defaults.headers.common['Accept'] = 'application/json';

/**
 * This could benefit from separating the API calls into separate files
 * based on the domain model. For example, a file for Project, a file for
 * Trustline, etc.
 * 
 * @typedef {Object} ProjectInfo
 */
export const XummService = {
    async getMintTokenPayload (grapheneProject)  {    
        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/project/mint`, grapheneProject);
    },
    async sendMintTx (tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/project/mint`, tx);
    },
    async getIssuerAccountSettingsPayload (domain)  {    
        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/tlcs/issuer/accountset`, {domain});
    },
    async sendIssuerAccountSettingsTx (tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/tlcs/issuer/accountset`, tx);
    },
    async getDistributorAccountSettingsPayload (domain)  {    
        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/tlcs/distributor/accountset`, {domain});
    },
    async sendDistributorAccountSettingsTx (tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/tlcs/distributor/accountset`, tx);
    },
    async getDistributorTrustlinePayload (tlcs)  {    
        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/tlcs`, tlcs);
    },
    async sendDistributorTrustlineTx (tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/tlcs`, tx);
    },
    async getAssertionPayload (claimsetId, benefitClaimsAsserted, 
        conveyanceIpfsHash, amount, vintage="2018")  {   
        
        // vintage: Optional[str]
        // amount: PaymentAmountSchema
        // currency: str
        // issuer: str
        // value: int
    

        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/tlcsa/${claimsetId}`, {
            "benefitClaimsAsserted": benefitClaimsAsserted,
            "claimSetId": claimsetId,
            "conveyanceUri": `ipfs://${conveyanceIpfsHash}`,
            "conveyanceIpfs": conveyanceIpfsHash,
            "amount": amount,
            "vintage": vintage
        });
    },
    async sendAssertionPayload (claimsetId, tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/tlcsa/${claimsetId}`, tx);
    }

};

