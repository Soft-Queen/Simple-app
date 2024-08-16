import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  const fetchUserById = async () => {
    const query = `
      query getUserById($id: ID!) {
        user(id: $id) {
          id
          name
          email
          phone
          website
          address {
            street
            suite
            zipcode
            city
          }
          company {
            name
          }
        }
      }
    `;

    const response = await fetch("https://graphqlzero.almansi.me/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
    });

    const result = await response.json();
    if (result.data && result.data.user) {
      setUser(result.data.user);
    } else {
      console.error("No user found in the response:", result);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, [id]); // Re-fetch user data when the id changes

  return (
    <div className="details">
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Address: {user.address.street}, {user.address.city}</p>
          <p>Company: {user.company.name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;
