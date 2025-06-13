const handleAuth = async () => {
  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in!');
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created!');
    }
  } catch (error) {
    alert((error as Error).message);
  }
};
