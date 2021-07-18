import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import { Typography, Space, Modal } from "antd";

const { Text } = Typography;

export default function BookCard(props) {
  const [visible, setVisible] = useState(false);

  return (
    <Col  xl={6} lg={8} xs={24} sm={12} >
      <Card
        hoverable
        className='card'
        style={{ height:350, background: "#ecf0f1", margin:'0 auto' }}
        onClick={() => setVisible(true)}
      >
        {
          <img
            alt="example"
            style={{ paddingBottom: "10px", width: "150px", height: "200px", display:'block', margin:'0 auto' }}
            src={
              props.info.volumeInfo.imageLinks
                ? props.info.volumeInfo.imageLinks.thumbnail
                : "https://i.pinimg.com/236x/f9/6d/a6/f96da6f95796ad8c63c17b7ec5b1759b--prayer-mat.jpg"
            }
          />
        }

        <Space direction="vertical">
          {props.info.volumeInfo.categories && (
            <Text type="secondary" underline>
              {props.info.volumeInfo.categories[0]}
            </Text>
          )}
          <Text strong className='truncate-text'>{props.info.volumeInfo.title}</Text>
          
          {props.info.volumeInfo.authors && (
            <Text type="secondary" className='truncate-text'>
              {props.info.volumeInfo.authors.join(", ")}
            </Text>
          )}
        </Space>
      </Card>

      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width="90%"
      >
        <Row>
          <Col span={6}>
            {
              <img
                alt="example"
                style={{
                  paddingBottom: "10px",
                  width: "150px",
                  height: "200px",
                }}
                src={
                  props.info.volumeInfo.imageLinks
                    ? props.info.volumeInfo.imageLinks.thumbnail
                    : "https://i.pinimg.com/236x/f9/6d/a6/f96da6f95796ad8c63c17b7ec5b1759b--prayer-mat.jpg"
                }
              />
            }
          </Col>
          <Col span={24} md={18}>
            <Space direction="vertical">
              {props.info.volumeInfo.categories && (
                <Text type="secondary" underline>
                  {props.info.volumeInfo.categories.join(", ")}
                </Text>
              )}

              <Text strong>{props.info.volumeInfo.title}</Text>

              {props.info.volumeInfo.authors && (
                <Text type="secondary">
                  {props.info.volumeInfo.authors.join(", ")}
                </Text>
              )}
              <Text>{props.info.volumeInfo.description}</Text>
            </Space>
          </Col>
        </Row>
      </Modal>
    </Col>
  );
}
