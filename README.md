# Miluz Management System (MVP)

## Index
- [1. Business Context](#1-business-context)
- [2. System Objective](#2-system-objective)
- [3. MVP Scope](#3-mvp-scope)
- [4. System Roles](#4-system-roles)
- [5. Main Business Flow](#5-main-business-flow)
- [6. System Entities (Conceptual Model)](#6-system-entities-conceptual-model)
- [7. Business Rules](#7-business-rules)
- [8. Edge Cases](#8-edge-cases)

---

## 1. Business Context

Currently, the nanny agency operates mainly through WhatsApp as a means to coordinate services, communicate with nannies and clients, and maintain operational control of the business. Although this approach has worked so far, it presents several problems as the volume of work increases.

Key business information (services performed, payments, nanny availability, client history) is scattered across multiple conversations, making it difficult to:
- Have clear visibility of who is working and when.
- Quickly consult the service history of a nanny or client.
- Perform weekly payment closures without reviewing past conversations.
- Detect errors, omissions, or unregistered services.

The absence of a centralized system generates dependency on the manager's manual knowledge and increases the risk of operational and financial errors.

This project seeks to **systematize the internal operation** of the agency without radically changing the way they communicate with clients and nannies, using an administrative system that functions as a single source of truth.

---

## 2. System Objective

The main objective of the system is to provide an internal administrative platform that allows the agency to manage its daily operation in a clear, orderly, and reliable manner.

The specific objectives of the MVP are:
- Centralize nanny, client, and service information.
- Have daily and weekly visibility of scheduled and completed services.
- Facilitate the control and calculation of weekly payments to nannies.
- Reduce dependency on manual searches in WhatsApp conversations.
- Maintain a searchable history of services and payments.

The system **does not seek to replace WhatsApp as a communication channel**, but rather to complement the operation with a structured tool for business management.

---

## 3. MVP Scope

### Inclusions
- Nanny management (registration, editing, and status).
- Client management (basic contact information).
- Service registration and tracking (occasional, full-time/placement, and overnight).
- Assignment of nannies to services.
- Control of weekly payments to nannies.
- Registration of collections from clients.
- Basic visualization of daily and weekly services.

### Exclusions (at this stage)
- Client portal.
- Nanny portal.
- Bank payment automation.
- Integration with the WhatsApp API.
- Rating or reputation system.
- Electronic invoicing.

These features may be considered in later phases of the project.

---

## 4. System Roles

The system is intended for internal use with the following roles:

### Admin
Main role, corresponding to the business owner.
- Total access to the system.
- Complete management of nannies, clients, and services.
- Visualization and control of financial information.
- Generation and closure of weekly payment periods.
- Configuration of base rates.

### Operator
Administrative support role.
- Registration and editing of services.
- Assignment of nannies to services.
- Consultation of operational information.
- No complete access to global financial reports.

The separation of roles seeks to maintain centralized financial control without limiting daily operations.

---

## 5. Main Business Flow

The system is designed to reflect the actual operational flow of the agency, from the moment a service is requested until the payment is made to the nanny. The main flow (happy path) is as follows:

1. A client requests a nanny service for a specific date and time.
2. The administrator or operator registers the service in the system.
3. The availability and profile of the nannies are consulted to select a candidate.
4. A nanny is assigned to the service and the corresponding rate is established.
5. The service is confirmed with the client and the nanny via WhatsApp.
6. The service takes place at the agreed date and time.
7. Upon completion of the service, it is marked as completed in the system.
8. At the end of the week, a weekly payment period closure is generated.
9. Bank transfers are made to the nannies and they are registered as paid in the system.

This flow represents the ideal scenario. The system also accounts for exceptions such as cancellations, schedule changes, or nanny substitutions, which are registered to maintain operational traceability.

---

## 6. System Entities (Conceptual Model)

The main entities of the system are described below at a conceptual level. This section defines **what each entity represents**, without entering into technical or implementation details yet.

### Nanny
Represents each person who provides childcare services through the agency.

Contains information such as:
- Basic personal data.
- Contact information.
- Areas where they can work.
- Relevant skills or characteristics.
- Operational status (active, on pause, etc.).
- Weekly work availability.

---

### Client
Represents mothers, fathers, or guardians who request nanny services.

Contains information such as:
- Name.
- Contact phone number.
- Address or area.
- Relevant notes for the fulfillment of the service.

---

### Service
Represents a shift or work event in which a nanny is assigned to a client.

Contains information such as:
- Requesting client.
- Assigned nanny.
- Date and time of the service.
- Type of service (occasional, full-time/placement, or overnight).
- Service status (requested, assigned, confirmed, completed, canceled).
- Operational notes.

In addition, each service stores the **specific economic agreement** for that case:
- Rate charged to the client (per hour or agreed amount).
- Rate paid to the nanny (per hour or agreed amount).
- Optional reason for adjustment (e.g., distance, urgency, low availability).

The service is the central entity of the system, as it connects nannies, clients, and payments.

---

### Availability
Represents the schedules during which a nanny can work on a recurring basis.

Allows defining:
- Available days of the week.
- Time ranges per day.
- Multiple blocks of availability per day.

Availability is used as a reference to facilitate service assignment, but it does not strictly block operations.

---

### Nanny Payment
Represents the record of payments made to a nanny for services rendered during a specific period.

Contains information such as:
- Payment period (weekly closure).
- Total amount to pay.
- Payment status (pending, paid).
- Payment date.
- Transfer reference.

The payment amount is calculated from the **completed services**, considering the **agreed rate in each service**, since the hourly payment may vary depending on specific conditions.

---

### Client Collection
Represents the record of payments made by clients to the agency.

Contains information such as:
- Associated service.
- Amount charged.
- Payment method.
- Collection status (pending, paid).

---

### Rates
Represents the base rates used by the agency as a reference to calculate the cost of services.

Contains information such as:
- Type of service.
- Base hourly rate for the client.
- Base hourly rate for the nanny.
- General application rules.

Base rates are used to auto-complete values when registering a service, but each service can have **specific agreed rates**, both for the charge to the client and the payment to the nanny.

---

## 7. Business Rules

The following rules define the expected behavior of the system and reflect how the agency currently operates. These rules must be respected during the design and implementation of the system.

### General Operation
- The system is for internal and administrative use.
- WhatsApp continues to be the main communication channel with clients and nannies.
- The system acts as the central source of business information.

### Services
- Every service must be associated with a client.
- A service can be associated with a nanny or remain temporarily unassigned.
- A service can be of type occasional, full-time/placement, or overnight.
- A service can change status during its lifecycle.
- A canceled service does not generate payment to the nanny.
- A completed service is eligible to be considered in the weekly payment period closure.
- The actual hours worked can differ from the hours initially registered and must be adjustable.

### Availability
- A nanny's availability represents a reference for service assignment.
- Availability does not strictly block the creation or assignment of services.
- A nanny can have multiple availability blocks on the same day.
- Availability can be modified without affecting already registered services.

### Rates
- Base rates exist according to the type of service (reference for auto-completion).
- The charge to the client and the payment to the nanny can vary per service.
- The system must allow overwriting (override) the base rate in a specific service.
- When a rate is overwritten in a service, an optional reason must be recordable (e.g., distance, urgency, low availability).
- The system must store the final agreement in each service:
  - rate charged to the client
  - rate paid to the nanny

### Payments to Nannies
- Payments to nannies are made on a weekly basis.
- The weekly closure groups completed services within the corresponding period.
- A service can only belong to one weekly closure.
- A payment marked as completed must not be modified without administrative authorization.
- Payments are made via bank transfer.
- The weekly closure must be calculated using the **rate paid to the nanny registered in each service**, not the base rate nor a nanny's "current" rate.
- If a service was already included in a closure marked as paid, its amounts must not change without an explicit administrative adjustment.

### Collections from Clients
- Collections from clients can be made before or after the service.
- A service can have its collection pending even if it has already been completed.
- The collection status must be updatable independently of the service status.

---

## 8. Edge Cases

The system must account for and allow the handling of exceptional situations that occur in the actual operation of the business.

### Cancellations
- A service can be canceled before it takes place.
- A canceled service must not be included in payment closures.
- The cancellation must remain registered for historical purposes.

### Last-Minute Changes
- A nanny can cancel their participation on the same day of the service.
- A service can be reassigned to another nanny.
- The system must allow updating the assigned nanny without losing the service history.

### Overnight Services
- A service can start on one day and end on the next.
- The calculation of hours worked must account for midnight crossings.
- Overnight services can have special rates.

### Overtime
- A service can extend beyond the schedule originally agreed upon.
- Additional hours must be recordable manually.
- The final amount of the service must reflect the actual hours worked.

### Overdue Payments and Collections
- A nanny can receive their payment at a date later than the weekly closure.
- A client can pay after the service has been completed.
- The system must allow identifying pending payments and collections.

### Human Errors
- A service can be registered with incorrect information.
- The system must allow corrections while maintaining operational consistency.
- Internal notes should facilitate the explanation of adjustments or changes made.

### Special Rates per Service
- A different payment to the nanny can be negotiated for a specific service (e.g., "if you go to this service I will pay you 100"), for reasons such as distance, urgency, or low availability.
- The system must allow registering the special rate and, optionally, the reason for the adjustment.
- The weekly closure must reflect the agreed payment for that service.

---

## 9. Tentative Project Roadmap

The development of the system is planned incrementally, prioritizing operational stability and business visibility first. This roadmap is **tentative** and can be adjusted as the real needs of daily use are validated.

---

### Phase 1: Internal Administrative MVP
**Objective:** Centralize the basic operation of the business and eliminate dependency on historical conversations.

Inclusions:
- Nanny management (registration, editing, status).
- Client management.
- Service registration and tracking.
- Assignment of nannies to services.
- Weekly availability handling.
- Base rate registration.
- Specific rate registration per service.
- Weekly closure of payments to nannies.
- Registration of collections from clients.
- Visualization of daily and weekly services.

Expected Result:
- Clear visibility of the operation.
- Searchable history of services and payments.
- Reduction of errors in weekly payments.

---

### Phase 2: Operational Optimization
**Objective:** Reduce operational friction and improve the administrative experience.

Possible Improvements:
- Templates for recurring services (full-time/placements).
- Quick duplication of services.
- Advanced filters by nanny, client, date, and status.
- Simple reports of income, payments, and commissions.
- Data export (Excel / PDF).
- Registration of incidents or post-service notes.

Expected Result:
- Less time spent on repetitive tasks.
- Better control and analysis of the operation.

---

### Phase 3: Controlled External Interaction
**Objective:** Reduce administrative load without losing control.

Possible Improvements:
- Web form for client requests.
- Automatic registration of services from forms.
- Manual confirmations from the administrative panel.
- Direct links to WhatsApp from the system.

Expected Result:
- More structured input data.
- Fewer errors in information capture.

---

### Phase 4: Scalability and Automation
**Objective:** Prepare the system for growth and greater automation.

Possible Improvements:
- Nanny portal (view assigned services, history).
- Client portal.
- Automatic notifications (email / WhatsApp).
- Partial automation of payments.
- Advanced performance and operation metrics.

Expected Result:
- Greater autonomy for external users.
- Significant reduction in manual administrative workload.

---

This roadmap serves as a strategic guide and not as a rigid implementation commitment. Each phase must be validated based on the actual use of the system and business needs.

---

## 10. Technical Stack and Design Criteria

This section describes the chosen technical stack and the criteria that will guide the implementation. It can be adjusted as the project progresses, but the focus is to maintain operational simplicity and data consistency.

---

### 10.1 Technical Stack (Chosen)

The system will be an internal administrative web application with separate frontend and backend.

**Frontend**
- React + TypeScript
- Vite (bundler)
- UI/Styles: (pending definition; possible TailwindCSS or another lightweight library)
- API Consumption: REST (HTTP)

**Backend**
- Python 3.12 + FastAPI
- REST API
- Validation: Pydantic v2 (built-in)
- ORM: SQLAlchemy 2.0
- Migrations: Alembic
- API Documentation: Swagger / ReDoc (auto-generated, built-in)
- Server: Uvicorn

**Database**
- PostgreSQL

**Authentication and Authorization**
- Authentication with credentials (email/user + password)
- Authorization by roles:
  - Admin (total control)
  - Operator (daily operation with restrictions)
- Recommended Strategy: JWT (access token) + refresh token (as needed)

**Local Development**
- Docker + Docker Compose (all services containerized)
- Single `docker compose up` runs entire stack locally

**Infra / Deployment (Tentative)**
- Frontend: Vercel or Netlify
- Backend: Railway / Render / Fly.io (or VPS)
- Managed PostgreSQL (according to the chosen provider)
- Environment variables for configuration per environment (dev/staging/prod)

---

### 10.2 Design Criteria

**Product-Operation Approach**
- The system centralizes critical business data (services, payments, history).
- WhatsApp is maintained as a communication channel, but is not considered a source of truth.

**Consistency and Traceability**
- The system must maintain a searchable history of services, collections, and payments.
- Agreed amounts are "frozen" per service:
  - rate charged to the client (per hour or final amount)
  - rate paid to the nanny (per hour or final amount)
- The weekly payment closure is calculated using the amounts registered in the completed services, not a global base rate.
- Each service must be traceable to the weekly closure in which it was paid (if applicable).

**Change-Oriented Design**
- The data model must allow incorporating future rules (discounts for full-time/placements, surcharges for urgency, multiple children, etc.) without redoing the main structure.
- A modular design in the backend is prioritized (FastAPI routers per domain: nannies, clients, services, payments, auth).

**Security and Privacy**
- Restricted access by roles and minimum necessary permissions.
- Personal data (phone numbers, addresses, notes) must be treated as sensitive information.
- Avoid exposing financial information to unauthorized roles.
- Best practices: password hashing, input validation, basic rate limiting (if applicable), configured CORS.

**Simplicity and UX**
- Registering a service must be fast and with clear validations.
- Availability is used as a reference to facilitate assignments, without blocking operations.
- The system must prioritize simple flows (create service, assign nanny, mark completed, generate weekly closure).

**Basic Observability**
- Logs of relevant actions (creation/editing/cancellation of services, closure of weekly periods).
- Consistent error handling (clear and traceable messages).
- API response conventions (HTTP codes + structured errors).