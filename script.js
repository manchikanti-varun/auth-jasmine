function fetchUserData() {
    return fetch('users.txt')
        .then(res => res.text())
        .then(data => data.trim().split('\n').map(line => {
            const [user, pass] = line.split(',');
            return { username: user.trim(), password: pass.trim() };
        }));
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const users = await fetchUserData();
    const valid = users.find(u => u.username === username && u.password === password);

    document.getElementById('message').textContent = valid ? 'Login successful!' : 'Invalid credentials.';
});

document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    const users = await fetchUserData();
    const exists = users.some(u => u.username === username);

    if (exists) {
        document.getElementById('message').textContent = 'Username already taken.';
    } else {
        document.getElementById('message').textContent = 'Signup successful (mocked only, no file writing).';
    }
});
