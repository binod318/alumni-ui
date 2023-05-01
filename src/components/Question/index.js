import { Modal } from 'antd';

const Question = ({isOpen, title, text, handleOk, handleCancel}) => {
  return (
    <>
      <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{text}</p>
      </Modal>
    </>
  );
};

export default Question;