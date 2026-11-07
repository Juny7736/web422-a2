/********************************************************************************
 * WEB422 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Junseo Han Student ID: 130574239 Date: 2026-11-06
 *
 ********************************************************************************/

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Form, Row, Col, Button } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      subject: "",
      language: "",
      first_publish_year: "",
    },
  });

  function submitForm(data) {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== ""),
      ),
    });
  }

  return (
    <>
      <PageHeader
        text="Search the Open Library"
        subtext="Find books by author, title, subject, language or year"
      />

      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                {...register("author", { required: true })}
                className={errors.author ? "is-invalid" : ""}
              />
              {errors.author?.type === "required" && (
                <div className="invalid-feedback">Author is required</div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" {...register("title")} />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control type="text" {...register("subject")} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. eng, fre, spa"
                {...register("language")}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control type="number" {...register("first_publish_year")} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </>
  );
}
