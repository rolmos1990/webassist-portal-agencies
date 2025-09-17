import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mapPermissionsToCheckOptions } from "../adapters/permissions-mapper";
import { ActivitiesLog } from '../components/ActivitiesLog';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import { CardAvatar } from '../components/CardAvatar';
import ContactCard from "../components/ContactCard";
import PermissionsAgentsVertical from "../components/Forms/PermissionsAgentsVertical";
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { QuotesTable } from "../components/Tables/QuotesTable";
import { SalesTable } from "../components/Tables/SalesTable";
import TabPanel from '../components/TabPanel';
import { activityData } from '../data/activityData';
import { quotesData } from "../data/quotesData";
import { reportingAgentsData } from "../data/reportingAgentData";
import { salesData } from "../data/salesData";
import { userPermissionsData } from "../data/userPermissionData";
import { StatusBadge } from "../components/StatusBadge";
import { defaultStatusTheme } from "../components/StatusBadge/StatusBadgeThemes";

export default function AgentDetail() {
    const navigate = useNavigate();
    
    const permissionsOptions = useMemo(
        () => mapPermissionsToCheckOptions(userPermissionsData),
        []
      );

      
    return (
        <div className="min-vh-100 bg-light">
            <div className="container-fluid py-3 px-4">
                <Breadcrumb title="Back" hasBack rightContent={
                    <div className="d-flex gap-2">
                        <UIButton
                            variant="outline-primary"
                            icon="bi bi-envelope"
                        >
                            Resend the Voucher
                        </UIButton>
                        <UIButton
                            variant="outline-primary"
                            icon="bi bi-pencil"
                        >
                            Modify Voucher Data
                        </UIButton>
                    </div>
                } />
                <div className="card shadow">
                    <div className="p-4">
                        <CardAvatar
                            avatarUrl="https://placehold.co/80x80"
                            name="Ramon Olmos"
                            status="Active"
                            email="ramonolmos@mail.com"
                            phone="+50768934567"
                            location="Panama"
                        />
                        <div className="">
                            <HorizontalCardList desktopCols={6}>
                                <HorizontalCardListItem
                                    title="Total Sales"
                                    value="$18,529.00"
                                    icon={""}
                                />
                                <HorizontalCardListItem
                                    title="Standing Quote Value"
                                    value="$4.324.25"
                                    icon={""}
                                />
                                <HorizontalCardListItem
                                    title="Total Commission Earned"
                                    value="$1.344.25"
                                    icon={""}
                                    tooltip="Total commission earned from all policies"
                                />
                                <HorizontalCardListItem
                                    title="Role"
                                    value="Admin"
                                    icon={""}
                                />
                                <HorizontalCardListItem
                                    title="Reporting Agents"
                                    value="4"
                                    icon={""}
                                />
                                <HorizontalCardListItem
                                    title="Date joined"
                                    value="15 mar 2022"
                                    icon={""}
                                />
                            </HorizontalCardList>
                        </div>
                        <div className="mt-4">
                            <TabPanel
                                tabs={[
                                    {
                                        id: 'activities-list',
                                        title: 'Activities',
                                        content: (
                                            <div className="my-4">
                                                <ActivitiesLog
                                                    activities={activityData}
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'reporting-agents',
                                        title: 'Reporting Agents',
                                        content: (
                                            <div className="row g-3">
                                                {reportingAgentsData.map((agent, index) => (
                                                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                                                        <ContactCard
                                                            name={agent.name}   
                                                            photoUrl={agent.photoUrl}
                                                            status={<StatusBadge status={agent.status} theme={defaultStatusTheme} />}
                                                            items={[
                                                                {
                                                                  icon: <i className="bi bi-envelope"></i>,
                                                                  content: agent.email
                                                                },
                                                                {
                                                                  icon: <i className="bi bi-telephone"></i>,
                                                                  content: agent.phone
                                                                },
                                                              ]}
                                                              action={{
                                                                label: "View Profile",
                                                                icon: <i className="bi bi-arrow-right"></i>,
                                                                onClick: () => navigate("/agent/" + agent.id)
                                                              }}
                                                        />
                                                    </div>
                                                ))} 
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'permissions',
                                        title: 'Permissions',
                                        content: (
                                            <div className="px-3 py-3">
                                                <PermissionsAgentsVertical
                                                name="permissions"
                                                options={permissionsOptions}
                                                onSubmit={(values) => {
                                                    console.log("Permissions changed:", values);
                                                }}
                                                />
                                          </div>
                                        )
                                    },
                                    {
                                        id: 'quotes',
                                        title: 'Quotes',
                                        content: (
                                            <QuotesTable
                                                data={quotesData}
                                                loading={false}
                                            />
                                        )
                                    },
                                    {
                                        id: 'sales',
                                        title: 'Sales',
                                        content: (
                                            <SalesTable
                                                data={salesData}
                                                loading={false}
                                            />
                                        )
                                    },
                                ]}
                                defaultActiveTab="activities-list"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}