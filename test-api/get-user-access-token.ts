export const getUserAccessToken = async (credentials?: {
  password: string;
  username: string;
}) => {
  const { password, username } = credentials ?? {
    password: 'strong$$-10-Pass',
    username: 'Poly',
  };

  const apiUrl = process.env.API_URL || 'http://localhost:3000';

  const response = await fetch(`${apiUrl}/auth/login`, {
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: { accessToken: string } = await response.json();

  return data.accessToken;
};
