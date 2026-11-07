import Link from "next/link";
import { Card } from "react-bootstrap";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export function getStaticProps() {
  return new Promise((resolve, reject) => {
    fetch("https://openlibrary.org/works/OL27482W.json")
      .then((res) => res.json())
      .then((data) => {
        resolve({ props: { book: data } });
      })
      .catch((err) => reject(err));
  });
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer: Junseo Han" />

      <Card>
        <Card.Body>
          <p>
            Hi, I&apos;m Junseo, a student at Seneca Polytechnic. I like
            building web apps and for this assignment I used React, Next.js and
            React-Bootstrap to pull data from the Open Library API. Check out
            the <Link href="/">Books</Link> page to browse a list of novels.
          </p>
          <p>
            The book I picked is <em>The Hobbit</em> by J.R.R. Tolkien. It
            follows Bilbo Baggins, a hobbit who would rather stay home as he
            gets pulled into an adventure with a group of dwarves to win back
            their treasure from the dragon Smaug.
          </p>
        </Card.Body>
      </Card>
      <br />

      <BookDetails
        book={props.book}
        workId="OL27482W"
        showFavouriteBtn={false}
      />
    </>
  );
}
