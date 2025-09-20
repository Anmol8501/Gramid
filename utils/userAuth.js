// signUp, logIn, logOut

export async function signUp(fields) {
    let result = {
        message: "",
        status: 500
    }
    
    try {
        const response = await fetch('/api/authentication/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        });

        const data = await response.json();
        
        if (response.ok && data.status === 200) {
            result = data;
        } else {
            result.message = data.message || 'Signup failed';
            result.status = data.status || response.status;
        }
    } catch (err) {
        console.error('Signup fetch error:', err);
        result.message = 'Network error. Please check your connection.';
        result.status = 500;
    }
    
    return result;
}

export async function logIn(fields) {
    let result = {
        message: "",
        status: 500,
        user: null
    }
    
    try {
        const response = await fetch('/api/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        });

        const data = await response.json();
        
        if (response.ok && data.status === 200) {
            result = data;
        } else {
            result.message = data.message || 'Login failed';
            result.status = data.status || response.status;
        }
    } catch (err) {
        console.error('Login fetch error:', err);
        result.message = 'Network error. Please check your connection.';
        result.status = 500;
    }
    
    return result;
}
