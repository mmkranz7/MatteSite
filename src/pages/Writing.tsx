import React from "react";
import PageWrapper from "../pages/PageWrapper";
import paperBg from "../assets/Paper03.png"; // your torn paper image
import "../Styles/Writing.css";

const Writing: React.FC = () => {
  const entries = [
    {
      id: 1,
      title: "Entry One",
      date: "2025-06-01",
      content:
        "This is my first writing piece. It goes here with multiple paragraphs...",
    },
    {
      id: 2,
      title: "Entry Two",
      date: "2025-06-05",
      content:
        "Another piece of writing content, continuing down the page in scroll.",
    },
  ];

  return (
    <PageWrapper>
      <div className="writing-page">
        {entries.map(({ id, title, date, content }) => (
          <section key={id} className="torn-paper-section">
            <img
              src={paperBg}
              alt=""
              className="torn-paper-bg"
              aria-hidden="true"
            />
            <h2>{title}</h2>
            <p className="date">{new Date(date).toLocaleDateString()}</p>
            <p>{content}</p>
          </section>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Writing;
