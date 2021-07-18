import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "./bookReducer";

import { Input } from "antd";
import { Select } from "antd";
import { Button } from "antd";
import BookCard from "./components/BookCard";

import { Typography } from "antd";
import { Row, Col, Divider } from "antd";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const { Search } = Input;
const { Option } = Select;

function App() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("relevance");
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);
  const totalItems = useSelector((state) => state.books.totalItems);
  const get = useSelector((state) => state.books.get);
  const error = useSelector((state) => state.books.error);

  const handleChangeSort = (value) => {
    setSort(value);
  };

  function handleChangeCategory(value) {
    setCategory(value);
  }

  const handleSubmit = async () => {
    if (!query) {
      return;
    }
    await setLoading(true);
    await dispatch(getBooks(0, query, category, sort, "search"));
    await setPage(1);
    await setLoading(false);
  };

  const loadMore = async () => {
    await dispatch(getBooks(page, query, category, sort, "more"));
    await setPage((prevState) => prevState + 1);
  };

  const handleCards = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 42 }} spin />;
    if (loading) {
      return (
        <Spin size="large" indicator={antIcon} style={{ padding: "50px", width:'100%' }} />
      );
    } else {
      return (
        <div>
              <Divider plain>found {totalItems} results</Divider>

              {!get ? <p style={{textAlign:'center'}} >По вашему запросу ничего не найдено</p>:null }
              {error ? <p style={{textAlign:'center'}} >Проверьте соединение или попробуйте позже</p>:null }

              <Row gutter={[16, 24]} style={{ padding: "0 5%" }}>
                {books.map((book, i) => (
                  <BookCard key={i} info={book} num={i} />
                ))}
              </Row>

              {totalItems > books.length ? (
              
              <Button type="primary" onClick={loadMore} style={{display:'block', margin:'10px auto'}}>
                Load more...
              </Button>
           
          ) : null}

        </div>
      );
    }
  };

  return (
    <div className="App">
      <header>
        <Row>
          <Col
            span={20}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 12, offset: 6 }}
            offset={2}
            xs={{ span: 22, offset: 1 }}
          >
            <Title style={{ color: "#fff" }}>Search for books</Title>

            <Search
              placeholder="Book Search"
              onSearch={handleSubmit}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              enterButton
            />

            <div className="selects">
              <div className="marginRight">
                <Text style={{ color: "#fff" }}>Categories </Text>

                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={handleChangeCategory}
                >
                  <Option value="">all</Option>
                  <Option value="art">art</Option>
                  <Option value='biography'>biography</Option>
                  <Option value="computers">computers</Option>
                  <Option value="history">history</Option>
                  <Option value="medical">medical</Option>
                  <Option value="poetry">poetry</Option>
                </Select>
              </div>

              <div>
                <Text style={{ color: "#fff" }}>Sorting by </Text>
                <Select
                  defaultValue="relevance"
                  style={{ width: 120 }}
                  onChange={handleChangeSort}
                >
                  <Option value="relevance">relevance</Option>
                  <Option value="newest">newest</Option>
                </Select>
              </div>
            </div>
          </Col>
        </Row>
      </header>

      {handleCards()}
    </div>
  );
}

export default App;
