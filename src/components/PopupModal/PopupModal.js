import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { guid } from "../../utils/basic";


const PopupModal = observer(
  ({
    visible = false,
    title = "",
    content = "",
    footer = "",
    titleContent,
    onClose,
    handleApply,
    isCloseIconVisible,
    size,
    popupBodyId = guid(),
  }) => {
    const [prevFocused, setPrevFocused] = useState();

    useEffect(() => {
      setPrevFocused(document.activeElement);
    }, []);

    useEffect(() => {
      const onKey = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleApply();
          event.stopImmediatePropagation();
        } else if (event.key === "Escape") {
          onClose();
          event.stopImmediatePropagation();
        }
      };

      if (popupBodyId) {
        const popupDocumentView = document.getElementById(
          `${popupBodyId}popup__modal`
        );
        if (popupDocumentView) {
          popupDocumentView.addEventListener("keydown", onKey);
          popupDocumentView.focus();
          return () => {
            popupDocumentView.removeEventListener("keydown", onKey);
            prevFocused?.focus();
          };
        }
      }
    }, [visible]);

    useEffect(() => {
      const popupModal = document.querySelector(
        `#popup__modal-body_${popupBodyId}`
      );
      if (popupModal) {
        popupModal.scrollTo({
          top: -10000,
          behavior: "smooth",
        });
      }
    }, []);

    const onCloseEvent = (e) => {
      if (e.target.id !== `${popupBodyId}popup__modal`) {
        return;
      }
      onClose();
    };

    const rank = title.map((item) => {
      return (
        <h3 className="popup__modal-title" key={`${item}_title`}>
          {item}
        </h3>
      );
    });

    if (!visible) return null;

    return (
      <div
        className={`popup__modal`}
        id={`${popupBodyId}popup__modal`}
        onMouseDown={(e) => {
          onCloseEvent(e);
        }}
        tabIndex="0"
      >
        <div className={`popup__modal-dialog ${size}`}>
          <div className="popup__modal-header">
            <div className="popup__modal-header_title">{rank}</div>
            <div className="popup__modal-header_content">{titleContent}</div>
            {isCloseIconVisible ? (
              <span className="popup__modal-title-close">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(e);
                  }}
                  name="buttonIcon__close"
                  className="action-button popup__button-action action-button_medium"
                  aria-label="buttonIcon__close"
                  title="Закрыть"
                  data-testid="search-button"
                >
                  <svg
                    className="action-button__svg buttonIcon__close"
                    type="button"
                  ></svg>
                </button>
              </span>
            ) : null}
          </div>
          <div
            className="popup__modal-body"
            id={`popup__modal-body_${popupBodyId}`}
          >
            <div
              className={
                typeof content === "string"
                  ? "popup__modal-body-content_text"
                  : "popup__modal-body-content_object"
              }
            >
              {content}
            </div>
          </div>
          {footer && <div className="popup__modal-footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

export { PopupModal };
