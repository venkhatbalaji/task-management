import { getRequest, postRequest } from '#Utils/request';
import { getUisvcBaseURL } from '../../src/config/config';

export class Company {
  static async getCompany(user, id) {
    const response = await getRequest(`${getUisvcBaseURL()}/company/${id}`, {
      'x-access-token': user.accessToken,
      email: user.email,
    });
    return response;
  }
  static async updateOpportunityName(companyData, user) {
    const response = await postRequest(
      `${getUisvcBaseURL()}/update-opportunity-name`,
      { ...companyData },
      { 'x-access-token': user.accessToken },
    );
    return response;
  }
  static async updateCompany(companyData, user) {
    const response = await postRequest(
      `${getUisvcBaseURL()}/update-company`,
      { ...companyData },
      { 'x-access-token': user.accessToken },
    );
    return response;
  }
  static async updateCompanyNda(companyData, user) {
    const response = await postRequest(
      `${getUisvcBaseURL()}/update-company-nda`,
      { ...companyData },
      { 'x-access-token': user.accessToken, 'Content-Type': 'multipart/form-data' },
    );
    return response;
  }
  static async updateCompanyIoi(companyData, user) {
    const response = await postRequest(
      `${getUisvcBaseURL()}/update-company-ioi`,
      { ...companyData },
      { 'x-access-token': user.accessToken },
    );
    return response;
  }
  static async getNewsData(link, user) {
    const response = await postRequest(
      `${getUisvcBaseURL()}/newslinks`,
      { url: link },
      { 'x-access-token': user.accessToken },
    );
    return response;
  }
  static async sendToReview(data, user) {
    const response = await postRequest(
      `${getUisvcBaseURL()}/send-review`,
      { ...data },
      { 'x-access-token': user.accessToken },
    );
    return response;
  }
}
