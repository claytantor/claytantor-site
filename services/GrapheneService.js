import Axios from 'axios';

import { apiConfig, webBaseUrl } from "../env";
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
export const GrapheneService = {
    async getInfo () {    
        return await Axios.get(`${apiConfig().apiBaseUrl}/info`);
    },
    async auth (email,password) {    
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);
        return Axios.post(`${apiConfig().apiBaseUrl}/auth/token`, params)
    },
    async getWallet (
        accountInfo=true,  
        accountLines=true,
        accountNfts=true,
        accountTx=true) {
        return await Axios.get(`${apiConfig().apiBaseUrl}/wallet`, 
            { params: { accountInfo, accountLines, accountTx, accountNfts } });
    },
    async createUser (email, password) {
        // used at signup
        //redirect_uri: "https://graphene.dev"
        const params = new URLSearchParams();
        params.append('redirect_uri', `${apiConfig().webBaseUrl}/login?status=VERIFIED`);
        params.append('email', email);
        params.append('password', password);
        return await Axios.post(`${apiConfig().apiBaseUrl}/user`, params);
    },
    async updateUser (email, wallet_id=null, password=null) {
        // used at signup
        //redirect_uri: "https://graphene.dev"
        return await Axios.put(`${apiConfig().apiBaseUrl}/user`, {email, wallet_id});
    },
    async getUser () {
        return await Axios.get(`${apiConfig().apiBaseUrl}/user`);
    },
    async createWallet({name, description=null}) {
        return await Axios.post(`${apiConfig().apiBaseUrl}/wallet`, {name, description});
    },
    async updateWallet({id, name, description=null}) {
        return await Axios.put(`${apiConfig().apiBaseUrl}/wallet`, {id, name, description});
    },
    async getWallets () {
        return await Axios.get(`${apiConfig().apiBaseUrl}/wallet`);
    },
    async createWalletFromAuth () {
        return await Axios.post(`${apiConfig().apiBaseUrl}/wallet/jwt`);
    },
    async makeFakeProject (projectInfo) {
        return await Axios.post(`${apiConfig().apiBaseUrl}/project/fake`, projectInfo);
    },
    async postPinProjectIPFS (project, role, wallet) {
        const projectRole = {
            "classic_address": wallet.classic_address,
            "roleType": role,
        }

        let projectInfo = {
            "id": project.id,
            "status": project.status,
            "epp": project.epp,
            "addressRoles": [projectRole],
        }

        return await Axios.post(`${apiConfig().apiBaseUrl}/project/pin`, projectInfo);
    },
    async mintProjectNFT (project) {
        return await Axios.post(`${apiConfig().apiBaseUrl}/project/mint`, project);
    },
    async putIssuerAccountset (domain) {
        return await Axios.put(`${apiConfig().apiBaseUrl}/tlcs/issuer/accountset`, {domain});
    },
    async putDistrubutorAccountset () {
        return await Axios.put(`${apiConfig().apiBaseUrl}/tlcs/distributor/accountset`, {});
    },
    async createClaimsetTrustline (trustlineInfo) {
        return await Axios.post(`${apiConfig().apiBaseUrl}/tlcs`, trustlineInfo);
    },
    async getClaimsetTrustline (trustlineId) {
        return await Axios.get(`${apiConfig().apiBaseUrl}/tlcs/${trustlineId}`);
    },
    async getClaimsetTrustlines () {
        return await Axios.get(`${apiConfig().apiBaseUrl}/tlcs`);
    },
    async getClaimsetTrustlinesAssertions () {
        return await Axios.get(`${apiConfig().apiBaseUrl}/tlcsa`);
    },
    async getAddressProjectNft(issuerAddress, projectId) {
        return await Axios.get(`${apiConfig().apiBaseUrl}/project/nft/${issuerAddress}/${projectId}`);
    },
    async getTrustlinesForProject(projectId) {
        return await Axios.get(`${apiConfig().apiBaseUrl}/tlcs/project/${projectId}`);
    },
    async uploadConveyanceDocument(trustlineId, documentFile) {
        let formData = new FormData();
        formData.append('file', documentFile);
        return await Axios.post(`${apiConfig().apiBaseUrl}/tlcsa/${trustlineId}/document`, formData);
    },
    async assertClaimsForTrustline(trustlineClaimId, benefitClaimList) {
        // TrustlineClaimsetAssertionRequestSchema
        // POST /tlcsa/{claimsetId}
        let trustlineClaimsetAssertionRequest = {
            "benefitClaimsAsserted": benefitClaimList,
            "claimSetId": trustlineClaimId
        };
        return await Axios.post(`${apiConfig().apiBaseUrl}/tlcsa/${trustlineClaimId}`,trustlineClaimsetAssertionRequest);
    },
    async getProject(projectId) {
        return await Axios.get(`${apiConfig().apiBaseUrl}/project/${projectId}`);
    },
    async importMintedProject(issuerAddress, projectId) {

        // /project/blockchain/{issuerAddress}/{projectId}
        return await Axios.get(`${apiConfig().apiBaseUrl}/project/import/${issuerAddress}/${projectId}`);
    },
    async getProjects() {
        return await Axios.get(`${apiConfig().apiBaseUrl}/project`);
    },
    async postProject(project) {
        return await Axios.post(`${apiConfig().apiBaseUrl}/project`, project);
    },
    async updateProject(project, wallet, role) {


        // get the address roles from the project_wallets 
        // and add the new one using a map function
        const addressRoles = project.project_wallets.map((pw) => {
            return {
                "wallet_id": pw.id,
                "roleType": pw.role,
            }
        });

        const projectRole = {
            "wallet_id": wallet.id,
            "roleType": role,
        }

        let projectInfo = {
            "id": project.id,
            "status": project.status,
            "epp": project.epp,
            "addressRoles": [...addressRoles,projectRole],
        }        
        return await Axios.put(`${apiConfig().apiBaseUrl}/project`, projectInfo);
    },
    async addProjectRole(project, roleName) {
        // let roleType = roleName === "Project Owner" ? "PROJECT_OWNER" : "DISTRIBUTOR";
        let projectRole = {
            "roleType": roleName,
        }
        let addRoleInfo = {
            "project_id": project.id,
            "projectRole": projectRole,
        }
        return await Axios.post(`${apiConfig().apiBaseUrl}/project/role`, addRoleInfo);
    },
    async deleteProject(projectId) {
        return await Axios.delete(`${apiConfig().apiBaseUrl}/project/${projectId}`);
    }
};

