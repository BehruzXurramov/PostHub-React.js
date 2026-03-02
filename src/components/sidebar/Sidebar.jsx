import { useState } from "react";
import "./sidebar.scss";

export function Sidebar() {
  const [user, setUser] = useState(() => {
    return {
      id: 1,
      name: "John Doe",
      username: "john_doe123",
      description: "Software developer and coffee enthusiast",
      email: "john.doe@example.com",
      is_active: true,
      created_at: "2024-01-15T10:30:00.000Z",
      updated_at: "2024-01-20T15:45:00.000Z",
      followers: 150,
      following: 75,
    };
  });

  return (
    <div className="sidebar">
      <div className="top">
        <span className="id" title={user.id}>
          id: {user.id}
        </span>
        <h3 className="name" title={user.name}>
          {user.name}
        </h3>
        <span className="info" title={`@${user.username}`}>
          @{user.username}
        </span>
        <a className="info" href={`mailto:${user.email}`} title={user.email}>
          {user.email}
        </a>
        <p className="description">{user.description}</p>
        <span className="follow">
          Follows: <span>{user.following}</span>
        </span>
        <span className="follow">
          Followers: <span>{user.followers}</span>
        </span>
      </div>
      <div className="bottom">
        <div className="btn_box">
          <button className="write_btn">+ Post</button>
        </div>
        <span className="time">
          Created:{" "}
          {new Date(user.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
        <span className="time">
          Updated:{" "}
          {new Date(user.updated_at).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
    </div>
  );
}
