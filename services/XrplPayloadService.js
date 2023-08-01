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
export const XrplPayloadService = {
    async getMintTokenPayload (project, role, wallet )  {   
        const projectRole = {
            "classic_address": wallet.classic_address,
            "roleType": role,
        }

        let grapheneProject = {
            "id": project.id,
            "status": project.status,
            "epp": project.epp,
            "addressRoles": [projectRole],
        } 

        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/project/mint`, grapheneProject);
    },
    async sendMintTx (tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/project/mint`, tx);
    },
    async getIssuerAccountSettingsPayload (domain, projectId)  {    
        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/tlcs/issuer/accountset`, {domain, projectId});
    },
    async sendIssuerAccountSettingsTx (tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/tlcs/issuer/accountset`, tx);
    },
    async getDistributorAccountSettingsPayload (projectId)  {    
        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/tlcs/distributor/accountset`, {projectId});
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
    },
    async getPaymentPayload (destinationAddress, amountXrp)  { 
        const paymentRequest = {
            amount: amountXrp,
            destination: destinationAddress
        }; 
        return await Axios.post(`${apiConfig().apiBaseUrl}/payload/payment`, paymentRequest);
    },
    async signAndSendPayload (tx)  {    
        return await Axios.put(`${apiConfig().apiBaseUrl}/payload/signsend`, tx);
    }

};

