import { fetchIpInfo, fetchBulkIpInfo } from './fetchIpInfo';
import { IpInfo } from './types';

const resolvers = {
  getIpInfo: async ({ ip }: { ip: string }): Promise<IpInfo> => {
    return fetchIpInfo(ip);
  },
  getIpListInfo: async ({ ips }: { ips: string }): Promise<IpInfo[]> => {
    return fetchBulkIpInfo(ips);
  }
};

export default resolvers;
