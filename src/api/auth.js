

export async function signUpUser(userData) {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('User signup failed');
        }

        const data = await response.json();
        console.log('User signed up successfully:', data);
        return data;  // Return the response data to use elsewhere if needed
    } catch (error) {
        console.error('Error during sign-up:', error);
        return null;
    }
}


export async function signInUser(email, password) {
    try {
       const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
       const users = await response.json();
       
       if (users.length === 0) {
          console.log("User not found");
          return { success: false, message: "User not found" };
       }
 
       const user = users[0];
       
       // Here we're comparing passwords directly, but in a real app, you'd hash the password first.
       if (user.password === password) {
          console.log("User authenticated successfully");
          return { success: true, user };
       } else {
          console.log("Invalid password");
          return { success: false, message: "Invalid password" };
       }
    } catch (error) {
       console.error("Error signing in:", error);
       return { success: false, message: "Server error" };
    }
 }
 
