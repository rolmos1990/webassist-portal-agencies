import { useState } from 'react';
import type { ReactNode } from 'react';
import '../assets/scss/components/_nav-tabs.scss';

interface TabPanelProps {
  tabs: {
    id: string;
    title: string;
    content: ReactNode;
  }[];
  defaultActiveTab?: string;
  className?: string;
}

export const TabPanel = ({ tabs, defaultActiveTab, className = '' }: TabPanelProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || (tabs.length > 0 ? tabs[0].id : ''));

  if (tabs.length === 0) return null;

  return (
    <div className={className}>
      <ul className="nav nav-tabs text-secondary" id="tabPanel" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item" role="presentation">
            <button
              className={`nav-link custom-tab ${activeTab === tab.id ? 'active' : ''}`}
              id={`${tab.id}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${tab.id}`}
              type="button"
              role="tab"
              aria-controls={tab.id}
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content pt-3" id="tabContent">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
            id={tab.id}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabPanel;