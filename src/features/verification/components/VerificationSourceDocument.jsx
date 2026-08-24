import React from 'react';

function NoticeBody({ document }) {
  return (
    <dl className="verification-document-fields">
      {document.fields.map(field => (
        <div key={field.label}>
          <dt>{field.label}</dt>
          <dd>{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function NewsletterBody({ document }) {
  return (
    <div className="verification-document-article">
      {document.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </div>
  );
}

function SurveyBody({ document }) {
  return (
    <>
      <dl className="verification-document-fields verification-document-fields--survey">
        {document.fields.map(field => (
          <div key={field.label}>
            <dt>{field.label}</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>
      <p className="verification-document-limit"><strong>이 조사로 알 수 없는 것</strong>{document.limitation}</p>
    </>
  );
}

function PostBody({ document }) {
  return (
    <div className="verification-document-post">
      <div><span className="verification-document-avatar" aria-hidden="true">?</span><strong>{document.authorLabel}</strong></div>
      <p>{document.body}</p>
      <small><strong>출처 확인:</strong> {document.sourceStatus}</small>
    </div>
  );
}

function DocumentBody({ document, excerpt }) {
  if (document?.kind === 'notice') return <NoticeBody document={document} />;
  if (document?.kind === 'newsletter') return <NewsletterBody document={document} />;
  if (document?.kind === 'survey') return <SurveyBody document={document} />;
  if (document?.kind === 'post') return <PostBody document={document} />;
  return <p className="verification-document-fallback">{excerpt}</p>;
}

export default function VerificationSourceDocument({ source, compact = false }) {
  const documentKind = source.document?.kind || 'plain';

  return (
    <section className={`verification-source-document verification-source-document--${documentKind} ${compact ? 'is-compact' : ''}`} aria-label={`${source.title} 자료 원문`}>
      <header className="verification-document-masthead">
        <span className="verification-document-icon" aria-hidden="true">{source.icon}</span>
        <div>
          <small>{source.document?.formatLabel || source.type}</small>
          <h3>{source.title}</h3>
          <p>{source.publisher}</p>
        </div>
      </header>
      <div className="verification-document-date">
        <span>게시일</span>
        <time dateTime={source.publishedAt}>{source.dateLabel}</time>
      </div>
      <div className="verification-document-body">
        <DocumentBody document={source.document} excerpt={source.excerpt} />
      </div>
      <footer><span>자료 종류</span><strong>{source.type}</strong></footer>
    </section>
  );
}
