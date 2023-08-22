const getAxiosConfig = () => {
    const user = localStorage.getItem("user");
  
    if (user) {
      const token = JSON.parse(user).token;
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      // Handle the case when the user is not logged in
      console.log("User not logged in");
      // Example: Redirect to the login page
      // history.push("/login");
      // You may also choose to throw an error or display a message instead
      // throw new Error("User not logged in");
    }
  };
  
  export default getAxiosConfig;
  