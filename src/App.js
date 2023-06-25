import { useEffect, useState } from "react";
import services from "./services/services";
import logo from "./images/Logo.png";

function App() {
  const [accounts, setAccounts] = useState(null);
  const [page, setPage] = useState(1);
  const [follows, setFollows] = useState(() => {
    const mySavedFollows = localStorage.getItem("myFollows");
    if (mySavedFollows) {
      return JSON.parse(mySavedFollows);
    }
    return [];
  });

  useEffect(() => {
    const getAccounts = async () => {
      const data = await services.getAll(page);
      setAccounts((prev) => {
        if (page !== 1) {
          return [...prev, ...data];
        }
        return data;
      });
    };
    getAccounts();
  }, [page]);

  useEffect(() => {
    localStorage.setItem("myFollows", JSON.stringify(follows));
  }, [follows]);

  const handleFollow = (account) => {
    setAccounts((prev) => [
      ...prev.map((acc) => {
        if (acc.id === account.id) {
          acc.followers += 1;
        }
        return acc;
      }),
    ]);
    setFollows((prev) => [...prev, account.id]);
    services.changeFollow(account.id, { followers: account.followers + 1 });
  };

  const handleUnfollow = (account) => {
    setAccounts((prev) => [
      ...prev.map((acc) => {
        if (acc.id === account.id) {
          acc.followers -= 1;
        }
        return acc;
      }),
    ]);
    setFollows((prev) => [
      ...prev.filter((accountId) => accountId !== account.id),
    ]);
    services.changeFollow(account.id, { followers: account.followers - 1 });
  };

  const renderCards = () =>
    accounts.map((account) => (
      <div className="card-wrapper" key={account.id}>
        <div className="top-side-wrapper">
          <img src={logo} alt="goit-logo" className="logo" />
        </div>
        <div className="contentWrapper">
          <img src={account.avatar} alt="avatar" />
          <p>{account.tweets} Tweets</p>
          <p>{account.followers} Followers</p>
          {follows.includes(account.id) ? (
            <button
              type="button"
              className="following-btn"
              onClick={() => handleUnfollow(account)}
            >
              Following
            </button>
          ) : (
            <button
              type="button"
              className="follow-btn"
              onClick={() => handleFollow(account)}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    ));

  return (
    <div className="container">
      <div className="cards-wrapper">{accounts && renderCards()}</div>
      <button
        type="button"
        className="load-more-btn"
        onClick={() => setPage((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
}

export default App;
