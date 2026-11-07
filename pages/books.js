import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();

  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  }

  const { data, error } = useSWR(
    router.isReady && qParts.length > 0
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(queryString)}&page=${page}&limit=10`
      : null,
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [router.asPath]);

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    setPage(page + 1);
  }

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={Object.keys(router.query)
          .map((key) => `${key}: ${router.query[key]}`)
          .join(" | ")}
      />

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData?.docs?.map((book) => (
            <tr key={book.key} onClick={() => router.push(book.key)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
