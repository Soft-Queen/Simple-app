export const CREATE_NEWUSER_MUTATION  =  `
mutation createUser($firstName: String!, $lastName: String!, $email: String!, $phone: String!) {
  createUser(input: { name: $firstName, username: $lastName, email: $email, phone: $phone }) {
    id
    name
    username
    email
    phone
  }
}
`;

export const getAllUsers = `
query getAllUsers {
  users {
    data {
      id
      name
      email
       company {
      name
    }
    }
  }
}
`;

export const responseFunc = async(query: any) => {
  const response = await fetch('https://graphqlzero.almansi.me/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
}