export default function PostgresAdapter(client, options = {}) {
  return {
    async createUser(user) {
      try {
        const { password, name } = user;
        const username = user.email;
        const query = 'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;';
        const values = [username, password, name];
        const data = await client.query(query, values);
        return data.rows[0];
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getUser(id) {
      try {
        const query = 'SELECT * FROM users WHERE user_id = $1;';
        const values = [id];
        const data = await client.query(query, values);
        return data.rows[0];
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getUserByEmail(email) {
      try {
        const query = 'SELECT * FROM users WHERE email = $1;';
        const values = [email];
        const data = await client.query(query, values);
        return data.rows[0];
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getUserByAccount(providerId, providerAccountId) {
    },
    async updateUser(user) {
      return
    },
    async deleteUser(userId) {
      return
    },
    async linkAccount(account) {
      return
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return
    },
    async createSession({ sessionToken, userId, expires }) {
      return
    },
    async getSessionAndUser(sessionToken) {
      return
    },
    async updateSession({ sessionToken }) {
      return
    },
    async deleteSession(sessionToken) {
      return
    },
  }
}