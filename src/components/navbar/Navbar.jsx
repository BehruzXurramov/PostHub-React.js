import { CiCircleRemove, CiSearch } from "react-icons/ci";
import "./navbar.scss";
import { Link } from "react-router";
import logo from "../../assets/favicon.svg";
import { useReducer, useState } from "react";

const historyReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const newState = [
        {
          id: state.length > 0 ? state[0].id + 1 : 1,
          value: action.value,
        },
        ...state,
      ];

      localStorage.setItem("search_history", JSON.stringify(newState));
      return newState;
    }
    case "REMOVE": {
      const newState = state.filter((item) => item.id !== action.id);

      localStorage.setItem("search_history", JSON.stringify(newState));
      return newState;
    }
    case "CLEAR": {
      localStorage.removeItem("search_history");
      return [];
    }
  }
};

const init = () => {
  let search_history = localStorage.getItem("search_history") || "[]";
  search_history = JSON.parse(search_history);

  return search_history;
};

export function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [historyState, historyDispatch] = useReducer(
    historyReducer,
    null,
    init,
  );

  const hundleSubmit = (e) => {
    e.preventDefault();
    const value = searchValue.trim();

    if (!value) return;

    historyDispatch({ type: "ADD", value });
    setSearchValue("");
  };

  return (
    <div className="navbar">
      <Link to={"/"} className="logo">
        <img src={logo} alt="Logo" />
        <h2>Post Hub</h2>
      </Link>
      <div className="input">
        <form onSubmit={hundleSubmit}>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Name or username..."
          />
          <button type="submit">
            <CiSearch />
          </button>
        </form>

        <div className="search_history">
          <div className="title">
            <span>Search history:</span>
            {historyState && historyState.length > 0 ? (
              <span
                onClick={() => historyDispatch({ type: "CLEAR" })}
                className="clear"
              >
                Clear
              </span>
            ) : null}
          </div>
          <div className="records">
            {historyState && historyState.length > 0 ? (
              historyState.map((item) => {
                if (!item) return null;

                return (
                  <div key={item.id}>
                    <span className="record-text" title={item.value}>
                      {item.value}
                    </span>
                    <CiCircleRemove
                      onClick={() =>
                        historyDispatch({ type: "REMOVE", id: item.id })
                      }
                    />
                  </div>
                );
              })
            ) : (
              <div style={{ justifyContent: "center", borderBottom: "none" }}>
                Nothing found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
