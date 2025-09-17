import { useNavigate } from 'react-router-dom';
import { CardAvatar } from '../components/CardAvatar';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { TabPanel } from '../components/TabPanel';
import ListGroup from '../components/ListGroup/ListGroup';
import ListItem from '../components/ListGroup/ListItem';
import ListContent from '../components/ListGroup/ListContent';
import { StatusBadge } from '../components/StatusBadge';
import { PlanListDataExample } from '../examples/planListExample';
import { StadingQuotesExample } from '../examples/stadingQuotes';
import Breadcrumb from '../components/Breadcrumb';
import { defaultStatusTheme } from '../components/StatusBadge/StatusBadgeThemes';

export default function ClientDetail() {
    const navigate = useNavigate();

    const noContent = <div className="border rounded-4 p-4 text-muted">
                        No standing quotes yet.
                      </div>;                        

    return (
<div className="min-vh-100 bg-light">
  <div className="container-fluid py-3 px-4">
        <Breadcrumb title="Back" hasBack rightContent={
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-primary rounded-pill bg-white">
              <i className="bi bi-envelope me-1"></i>Resend the Voucher
            </button>
            <button type="button" className="btn btn-outline-primary rounded-pill bg-white">
              <i className="bi bi-pencil me-1"></i>Modify Voucher Data
            </button>
          </div>
        } />
        <div className="card shadow">
            <div className="p-4">
                <CardAvatar 
                  avatarUrl="https://placehold.co/80x80"
                  name="Mateo Castillo"
                  status="Active"
                  email="matoectl@mail.com"
                  phone="+50768934567"
                  location="La Palma, Panama"
                />
                <div className="">
                    <HorizontalCardList desktopCols={5}>
                      <HorizontalCardListItem 
                        title="Total Premiums Paid"
                        value="$1529.00"
                        icon={""}
                      />
                      <HorizontalCardListItem 
                        title="Standing Quote Value"
                        value="$344.25"
                        icon={""}
                      />
                      <HorizontalCardListItem 
                        title="Total Commission Earned"
                        value="$344.25"
                        icon={""}
                        tooltip="Total commission earned from all policies"
                      />
                      <HorizontalCardListItem 
                        title="Number of Purchases"
                        value="5"
                        icon={""}
                      />
                      <HorizontalCardListItem 
                        title="Active Plans"
                        value="2"
                        icon={""}
                      />
                    </HorizontalCardList>
                </div>

                <div className="mt-4">
                    <TabPanel 
                      tabs={[
                        {
                          id: 'plan-list',
                          title: 'Plan List',
                          content: (
                            <ListGroup>
                              {PlanListDataExample().map((plan, index) => (
                                <ListItem key={index} onClick={() => navigate(`/users/1/plan/123`)}>
                                  <ListContent title="Plan Number" colSize={6}>{plan.planNumber}</ListContent>
                                  <ListContent title="Plan Name" colSize={6}>{plan.planName}</ListContent>
                                  <ListContent title="Status" colSize={6}><StatusBadge status={plan.status} theme={defaultStatusTheme} /></ListContent>
                                  <ListContent title="Start Date" colSize={6}>{plan.startDate}</ListContent>
                                  <ListContent title="End Date" colSize={6}>{plan.endDate}</ListContent>
                                  <ListContent title="Amount Paid" colSize={6} isLast>{plan.amountPaid}</ListContent>
                                </ListItem>
                              ))}
                            </ListGroup>
                          )
                        },
                        {
                          id: 'standing-quotes',
                          title: 'Standing Quotes',
                          content: (
                            <ListGroup>
                          {StadingQuotesExample().map((plan, index) => (
                            <ListItem key={index}>
                              <ListContent title="Plan Name" colSize={6}>{plan.planName}</ListContent>
                              <ListContent title="Travelers Number" colSize={6}>{plan.travelersNumber}</ListContent>
                              <ListContent title="Quote Amount" colSize={6}>{plan.quoteAmount}</ListContent>
                              <ListContent title="Start Date" colSize={6}>{plan.startDate}</ListContent>
                              <ListContent title="End Date" colSize={6}>{plan.endDate}</ListContent>
                              <ListContent title="Quote Amount" colSize={6} isLast>{plan.quoteAmount}</ListContent>
                            </ListItem>
                          ))}
                        </ListGroup>
                        )}
                      ]}
                      defaultActiveTab="plan-list"
                    />
                </div>
            </div>
        </div>
  </div>
</div>

    );
}