import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // 🔐 Check user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else router.push("/auth");
    });
    return () => unsubscribe();
  }, []);

  // 🔁 Load messages in realtime
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: message,
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  const logout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Welcome {user?.email}</h2>
      <button onClick={logout}>Logout</button>

      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc", marginTop: 20, padding: 10 }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: "10px 0", background: msg.uid === user.uid ? "#dcf8c6" : "#f1f0f0", padding: 8, borderRadius: 5 }}>
            <strong>{msg.email}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "80%", padding: 8 }}
        />
        <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10 }}>
          Send
        </button>
      </div>
    </div>
  );
}
