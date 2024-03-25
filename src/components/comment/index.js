import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";
import formatDate from "../../utils/format-date";
import NewReply from "../new-reply";

function Comment({ item, session, onOpenReply, onCloseReply, onSendReply, t }) {
  const nestedComments = (item.children || []).map((item) => {
    return (
      <div key={item._id} style={{ paddingLeft: "25px" }}>
        <Comment
          item={item}
          onOpenReply={onOpenReply}
          onCloseReply={onCloseReply}
          onSendReply={onSendReply}
          session={session}
          t={t}
        />
      </div>
    );
  });

  console.log(item);

  const callbacks = {
    openReply: useCallback((e) => {
      // e.stopPropagation();
      onOpenReply(item._id);
    }),
    closeReply: useCallback((e) => {
      // e.stopPropagation();
      onCloseReply(item._id);
    }),
    sendReply: useCallback((text) => {
      onSendReply(item._id, text);
    }),
  };

  return (
    <>
      <div className="Comment">
        <div className="Comment-info">
          <div className="Comment-user">{item.author.profile.name}</div>
          <div className="Comment-date">
            {formatDate(item.dateCreate, t("comments.locale"))}
          </div>
        </div>
        <div className="Comment-text">{item.text}</div>
        <div className="Comment-reply" onClick={callbacks.openReply}>
          {t("comments.reply")}
        </div>
        {item.openReply && (
          <NewReply
            onClose={callbacks.closeReply}
            onSend={callbacks.sendReply}
            session={session}
            t={t}
          />
        )}
        {nestedComments}
      </div>
    </>
  );
}

Comment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  session: PropTypes.bool,
  onOpenReply: PropTypes.func,
  onCloseReply: PropTypes.func,
  onSendReply: PropTypes.func,
  t: PropTypes.func,
};

Comment.defaultProps = {
  onAdd: () => {},
  onOpenReply: () => {},
  onCloseReply: () => {},
  onSendReply: () => {},
  t: (text) => text,
};
export default memo(Comment);
