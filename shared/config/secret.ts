import getEnvVar from '../utils/getEnvVar';

const secret = getEnvVar('NEXTAUTH_SECRET');
export default secret;
