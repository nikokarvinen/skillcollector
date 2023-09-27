--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ratings; Type: TABLE; Schema: public; Owner: skillcollector
--

CREATE TABLE public.ratings (
    user_id integer NOT NULL,
    user_hash character varying(50),
    skill_id character varying(50),
    title character varying(255),
    rating integer,
    is_sfia boolean,
    datetime timestamp with time zone
);


ALTER TABLE public.ratings OWNER TO skillcollector;

--
-- Name: skills; Type: TABLE; Schema: public; Owner: skillcollector
--

CREATE TABLE public.skills (
    id character varying(20) NOT NULL,
    title character varying(50),
    category character varying(50),
    subcategory character varying(50),
    gen_description character varying(255)
);


ALTER TABLE public.skills OWNER TO skillcollector;

--
-- Name: users; Type: TABLE; Schema: public; Owner: skillcollector
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_hash character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO skillcollector;

--
-- Name: users_credentials; Type: TABLE; Schema: public; Owner: skillcollector
--

CREATE TABLE public.users_credentials (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users_credentials OWNER TO skillcollector;

--
-- Name: users_credentials_id_seq; Type: SEQUENCE; Schema: public; Owner: skillcollector
--

CREATE SEQUENCE public.users_credentials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_credentials_id_seq OWNER TO skillcollector;

--
-- Name: users_credentials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skillcollector
--

ALTER SEQUENCE public.users_credentials_id_seq OWNED BY public.users_credentials.id;


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: skillcollector
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO skillcollector;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skillcollector
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: users_credentials id; Type: DEFAULT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.users_credentials ALTER COLUMN id SET DEFAULT nextval('public.users_credentials_id_seq'::regclass);


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: skillcollector
--

COPY public.ratings (user_id, user_hash, skill_id, title, rating, is_sfia, datetime) FROM stdin;
1	0123456789	empa	Empathy	1	f	2023-06-16 19:25:08+00
1	0123456789	vuas	Vulnerability assessment	3	t	2023-06-16 19:25:08+00
1	0123456789	dgfs	Digital forensics	3	t	2023-06-16 19:25:08+00
1	0123456789	stmg	Storage management	3	t	2023-06-16 19:25:08+00
1	0123456789	scmg	Service catalogue management	3	t	2023-06-16 19:25:08+00
1	0123456789	sysp	System software	4	t	2023-06-16 19:25:08+00
1	0123456789	cpmg	Capacity management	4	t	2023-06-16 19:25:08+00
1	0123456789	relm	Release and deployment	4	t	2023-06-16 19:25:08+00
1	0123456789	admn	Business administration	4	t	2023-06-16 19:25:08+00
1	0123456789	itcm	Contract management	1	t	2023-06-16 19:25:08+00
1	0123456789	csmg	Customer service support	1	t	2023-06-16 19:25:08+00
1	0123456789	sorc	Sourcing	1	t	2023-06-16 19:25:08+00
1	0123456789	supp	Supplier management	4	t	2023-06-16 19:25:08+00
1	0123456789	pemt	Performance management	1	t	2023-06-16 19:25:08+00
1	0123456789	usup	Incident management	1	t	2023-06-16 19:25:08+00
1	0123456789	seac	Service acceptance	2	t	2023-06-16 19:25:08+00
1	0123456789	psol	Problem solving	3	f	2023-06-16 19:25:08+00
1	0123456789	chad	Change adaptivity	2	f	2023-06-16 19:25:08+00
1	0123456789	ntas	Network support	2	t	2023-06-16 19:25:08+00
1	0123456789	slmo	Service level management	2	t	2023-06-16 19:25:08+00
1	0123456789	hsin	Systems installation and removal	2	t	2023-06-16 19:25:08+00
1	0123456789	avmt	Availability management	2	t	2023-06-16 19:25:08+00
1	0123456789	asmg	Asset management	3	t	2023-06-16 19:25:08+00
\.


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: skillcollector
--

COPY public.skills (id, title, category, subcategory, gen_description) FROM stdin;
pemt	Performance management	People and skills	People management	Improving organisational performance by developing the performance of individuals and workgroups to meet agreed objectives with measurable results.
benm	Benefits management	Change and transformation	Change planning	Forecasting, planning and monitoring the emergence and effective realisation of anticipated benefits from projects and programmes.
pomg	Portfolio management	Change and transformation	Change implementation	Developing and applying a management framework to define and deliver a portfolio of programmes, projects and/or ongoing services.
burm	Risk management	Strategy and architecture	Governance, risk and compliance	Planning and implementing organisation-wide processes and procedures for the management of risk to the success or integrity of the enterprise.
datm	Data management	Development and implementation	Data and analytics	Developing and implementing plans, policies, and practices that control, protect and optimise the value of data assets.
reqm	Requirements definition and management	Change and transformation	Change analysis	Managing requirements through the entire delivery and operational life cycle.
supp	Supplier management	Relationships and engagement	Stakeholder management	Aligning the organisation’s supplier performance objectives and activities with sourcing strategies and plans, balancing costs, efficiencies and service quality.
tech	Specialist advice	Strategy and architecture	Advice and guidance	Providing authoritative advice and direction in a specialist area.
pdsv	Professional development	People and skills	People management	Facilitating the professional development of individuals in line with their career goals and organisational requirements.
chmg	Change control	Delivery and operation	Service management	Assessing risks associated with proposed changes and ensuring changes to products, services or systems are controlled and coordinated.
relm	Release and deployment	Delivery and operation	Technology management	Applying the processes, systems and functions required to make new and changed services and features available for use.
resd	Real-time/embedded systems development	Development and implementation	Systems development	Designing and developing reliable real-time software typically within embedded systems.
wfpl	Workforce planning	People and skills	People management	Estimating the demand for people and skills and planning the supply needed to meet that demand.
isco	Information systems coordination	Strategy and architecture	Strategy and planning	Coordinating information and technology strategies where the adoption of a common approach would benefit the organisation.
cipm	Organisational change management	Change and transformation	Change planning	Planning, designing and implementing activities to transition the organisation and people to the required future state.
desn	Systems design	Development and implementation	Systems development	Designing systems to meet specified requirements and agreed systems architectures.
scty	Information security	Strategy and architecture	Security and privacy	Defining and operating a framework of security controls and security management strategies.
empa	Empathy	Soft skills	\N	Empathy involves the ability to understand and share the feelings of others. In the IT field, empathy can help build positive relationships with clients and co-workers.
rlmt	Stakeholder relationship management	Relationships and engagement	Stakeholder management	Influencing stakeholder attitudes, decisions, and actions for mutual benefit.
hpcc	High-performance computing	Development and implementation	Computational science	Using advanced computer systems and special programming techniques to solve complex computational problems.
port	Software configuration	Development and implementation	Systems development	Designing and deploying software product configurations into software environments or platforms.
netw	Networking	Soft skills	\N	Networking involves building relationships and connections with others in the industry. In the IT field, networking can lead to job opportunities, collaborations, and the exchange of knowledge and expertise.
bint	Business intelligence	Development and implementation	Data and analytics	Developing, producing and delivering regular and one-off management information to provide insights and aid decision-making.
dbad	Database administration	Development and implementation	Data and analytics	Installing, configuring, monitoring, maintaining and improving the performance of databases and data stores.
adev	Animation development	Development and implementation	Systems development	Designing and developing animated and interactive systems such as games and simulations.
urch	User research	Development and implementation	User experience	Identifying users' behaviours, needs and motivations using observational research methods.
ssup	Sales support	Relationships and engagement	Sales and marketing	Providing advice and support to the sales force, customers and sales partners.
copl	Continuity management	Strategy and architecture	Strategy and planning	Developing, implementing and testing a business continuity framework.
cpmg	Capacity management	Delivery and operation	Service management	Ensuring that service components have the capacity and performance to meet current and planned business needs.
busa	Business situation analysis	Change and transformation	Change analysis	Investigating business situations to define recommendations for improvement action.
peri	Personal interest	Soft skills	\N	Personal interest involves having a genuine passion and interest in the IT field. In the IT field, personal interest can drive motivation and lead to a successful career.
meas	Measurement	Strategy and architecture	Strategy and planning	Developing and operating a measurement capability to support agreed organisational information needs.
comm	Communication	Soft skills	\N	Communication is the ability to clearly and effectively convey information, ideas, and thoughts to others. In the IT field, good communication skills are crucial for communicating technical information to both technical and non-technical audiences.
pedp	Personal data protection	Strategy and architecture	Security and privacy	Implementing and operating a framework of controls and management strategies to promote compliance with personal data legislation.
coso	Conflict solving	Soft skills	\N	Conflict solving involves the ability to effectively manage and resolve conflicts that may arise within a team or with clients. In the IT field, strong conflict-solving skills can help maintain positive relationships and ensure project success.
sysp	System software	Delivery and operation	Technology management	Installing, managing, controlling, deploying and maintaining infrastructure systems software, to meet operational needs and service levels.
pgmg	Programme management	Change and transformation	Change implementation	Identifying, planning and coordinating a set of related projects and activities in support of specific business strategies and objectives.
pent	Penetration testing	Delivery and operation	Security services	Testing the effectiveness of security controls by emulating the tools and techniques of likely attackers.
dats	Data science	Development and implementation	Data and analytics	Applying mathematics, statistics, data mining and predictive modelling techniques to gain insights, predict behaviours and generate value from data.
sorc	Sourcing	Relationships and engagement	Stakeholder management	Managing, or providing advice on, the procurement or commissioning of products and services.
feas	Feasibility assessment	Change and transformation	Change analysis	Defining, evaluating and describing business change options for financial, technical and business feasibility, and strategic alignment.
csmg	Customer service support	Relationships and engagement	Stakeholder management	Managing and operating customer service or service desk functions.
prog	Programming/software development	Development and implementation	Systems development	Developing software components to deliver value to stakeholders.
hcev	User experience design	Development and implementation	User experience	Producing design concepts and prototypes for user interactions with and experiences of a product, system or service.
cfmg	Configuration management	Delivery and operation	Technology management	Planning, identifying, controlling, accounting for and auditing of configuration items (CIs) and their interrelationships.
cnsl	Consultancy	Strategy and architecture	Advice and guidance	Providing advice and recommendations, based on expertise and experience, to address client needs.
lead	Leadership	Soft skills	\N	Leadership involves the ability to inspire and motivate others towards a common goal. In the IT field, leadership skills can be important for managing teams and guiding projects to successful completion.
dtan	Data modelling and design	Development and implementation	Data and analytics	Developing models and diagrams to represent and communicate data requirements and data assets.
itop	IT infrastructure	Delivery and operation	Technology management	Deploying, configuring and operating IT Infrastructure.
sint	Systems integration and build	Development and implementation	Systems development	Planning, implementing and controlling activities to synthesise system components to create operational systems, products or services.
govn	Governance	Strategy and architecture	Governance, risk and compliance	Defining and operating a framework for making decisions, managing stakeholder relationships, and identifying legitimate authority.
ntds	Network design	Development and implementation	Systems development	Designing communication networks to support strategic and operational requirements and producing network strategies, architectures, policies and related documentation.
swdn	Software design	Development and implementation	Systems development	Specifying and designing software to meet defined requirements by following agreed design standards and principles.
bpre	Business process improvement	Change and transformation	Change planning	Creating new and potentially disruptive approaches to performing business activities.
audt	Audit	Strategy and architecture	Governance, risk and compliance	Delivering independent, risk-based assessments of the effectiveness of processes, the controls, and the compliance environment of an organisation.
tman	Time management	Soft skills	\N	Time management involves the ability to effectively manage and prioritize tasks in order to meet deadlines. In the IT field, good time management skills are crucial for staying on top of multiple projects and meeting tight deadlines.
teac	Teaching	People and skills	Skills management	Delivering and assessing curricula in a structured and systematic education environment.
csop	Certification scheme operation	People and skills	Skills management	Designing, developing and operating certification schemes, accreditations and credentials, including digital credentials or badges.
visl	Data visualisation	Development and implementation	Data and analytics	Facilitating understanding of data by displaying concepts, ideas, and facts using graphical representations.
metl	Methods and tools	Strategy and architecture	Advice and guidance	Ensuring methods and tools are adopted and used effectively throughout the organisation.
cthk	Critical thinking	Soft skills	\N	Critical thinking involves the ability to analyze information and make sound decisions. In the IT field, critical thinking is important for making informed decisions and solving complex problems.
rkgk	Research and knowledge gathering	Soft skills	\N	IT professionals need to be able to gather information from a variety of sources, such as academic journals, industry publications, and online forums, in order to stay current on the latest trends and technologies.
scad	Security operations	Delivery and operation	Security services	Delivering management, technical and administrative services to implement security controls and security management strategies.
know	Knowledge management	Development and implementation	Content management	Managing vital knowledge to create value for the organisation.
deng	Data engineering	Development and implementation	Data and analytics	Designing, building, operationalising, securing and monitoring data pipelines and data stores.
thin	Threat intelligence	Strategy and architecture	Security and privacy	Developing and sharing actionable insights on current and potential security threats to the success or integrity of an organisation.
dcma	Facilities management	Delivery and operation	Technology management	Planning, designing and managing the buildings, space and facilities which, collectively, make up the IT estate.
prmg	Project management	Change and transformation	Change implementation	Delivering agreed outcomes from projects using appropriate management techniques, collaboration, leadership and governance.
cury	Curiosity	Soft skills	\N	Cooperation involves the ability to work together with others towards a common goal. In the IT field, cooperation is important for effectively collaborating on projects and sharing knowledge and expertise.
inca	Content authoring	Development and implementation	Content management	Planning, designing and creating textual information, supported where necessary by graphical content.
fmit	Financial management	Strategy and architecture	Strategy and planning	Supporting the effective use and control of financial resources.
qumg	Quality management	Strategy and architecture	Governance, risk and compliance	Defining and operating a management framework of processes and working practices to deliver the organisation's quality objectives.
tmcr	Learning design and development	People and skills	Skills management	Designing and developing resources to transfer knowledge, develop skills and change behaviours.
mlng	Machine learning	Development and implementation	Data and analytics	Developing systems that learn through experience and by the use of data.
hwde	Hardware design	Development and implementation	Systems development	Specifying a hardware design model for a defined system architecture.
unan	User experience analysis	Development and implementation	User experience	Understanding the context of use for systems, products and services and specifying user experience requirements and design goals.
twor	Team working	Soft skills	\N	Teamwork involves the ability to work effectively with others towards a common goal. In the IT field, teamwork is important for collaborating on projects and sharing knowledge and expertise.
itmg	Technology service management	Delivery and operation	Technology management	Managing the provision of technology-based services to meet defined organisational needs.
test	Testing	Development and implementation	Systems development	Investigating products, systems and services to assess behaviour and whether this meets specified or unspecified requirements and characteristics.
quas	Quality assurance	Strategy and architecture	Governance, risk and compliance	Assuring, through ongoing and periodic assessments and reviews, that the organisation’s quality objectives are being met.
rsch	Research	Strategy and architecture	Strategy and planning	Systematically creating new knowledge by data gathering, innovation, experimentation, evaluation and dissemination.
pbmg	Problem management	Delivery and operation	Service management	Managing the life cycle of all problems that have occurred or could occur in delivering a service.
scmg	Service catalogue management	Delivery and operation	Service management	Providing a source of consistent information about available services and products to customers and users.
stmg	Storage management	Delivery and operation	Technology management	Planning, implementing and optimising the technologies and processes used for data storage.
sust	Sustainability	Strategy and architecture	Strategy and planning	Providing advice, assistance and leadership to enable the organisation to minimise negative environmental impact.
demm	Demand management	Strategy and architecture	Strategy and planning	Analysing and proactively managing business demand for new services or modifications to existing service features or volumes.
dgfs	Digital forensics	Delivery and operation	Security services	Recovering and investigating material found in digital devices.
rfen	Radio frequency engineering	Development and implementation	Systems development	Designing, installing and maintaining radio frequency based devices and software.
inov	Innovation	Strategy and architecture	Strategy and planning	Identifying, prioritising, incubating and exploiting opportunities provided by information, communication and digital technologies.
sale	Selling	Relationships and engagement	Sales and marketing	Finding prospective customers and working with them to identify needs, influence purchase decisions and enhance future business opportunities.
resc	Resourcing	People and skills	People management	Acquiring, deploying and onboarding resources.
sfen	Safety engineering	Development and implementation	Systems development	Applying appropriate methods to assure safety during all life cycle phases of safety-related systems developments.
vuas	Vulnerability assessment	Delivery and operation	Security services	Identifying and classifying security vulnerabilities in networks, systems and applications and mitigating or eliminating their impact.
icpm	Content publishing	Development and implementation	Content management	Managing and continually improving the processes that collect, assemble and publish content.
bpts	Acceptance testing	Change and transformation	Change analysis	Validating systems, products, business processes or services to determine whether the acceptance criteria have been satisfied.
crea	Creativity	Soft skills	\N	Creativity involves the ability to think outside the box and come up with innovative solutions to problems. In the IT field, creativity can lead to new ideas and improved processes.
asmg	Asset management	Delivery and operation	Service management	Managing the full life cycle of assets from acquisition, operation, maintenance to disposal.
vure	Vulnerability research	Strategy and architecture	Security and privacy	Conducting applied research to discover, evaluate and mitigate new or unknown security vulnerabilities and weaknesses.
coop	Co-operation	Soft skills	\N	Cooperation involves the ability to work together with others towards a common goal. In the IT field, cooperation is important for effectively collaborating on projects and sharing knowledge and expertise.
inas	Information assurance	Strategy and architecture	Security and privacy	Protecting against and managing risks related to the use, storage and transmission of data and information systems.
ofcl	Organisational facilitation	People and skills	People management	Supporting workgroups to implement principles and practices for effective teamwork across organisational boundaries and professional specialisms.
ordi	Organisation design and implementation	Change and transformation	Change planning	Planning, designing and implementing an integrated organisation structure and culture.
itsp	Strategic planning	Strategy and architecture	Strategy and planning	Creating and maintaining a strategy to align organisational actions, plans and resources with business objectives.
emrg	Emerging technology monitoring	Strategy and architecture	Strategy and planning	Identifying and assessing new and emerging technologies, products, services, methods and techniques.
dlmg	Systems development management	Development and implementation	Systems development	Planning, estimating and executing systems development work to time, budget and quality targets.
asup	Application support	Delivery and operation	Technology management	Delivering management, technical and administrative services to support and maintain live applications.
dbds	Database design	Development and implementation	Data and analytics	Specifying, designing and maintaining mechanisms for storing and accessing data.
etmg	Learning and development management	People and skills	Skills management	Delivering management, advisory and administrative services to support the development of knowledge, skills and competencies.
irmg	Information management	Strategy and architecture	Strategy and planning	Planning, implementing and controlling the full life cycle management of digitally organised information and records.
avmt	Availability management	Delivery and operation	Service management	Ensuring that services deliver agreed levels of availability to meet the current and future needs of the business.
hsin	Systems installation and removal	Delivery and operation	Technology management	Installing and testing, or decommissioning and removing, systems or system components.
eexp	Employee experience	People and skills	People management	Enhancing employee engagement and ways of working, empowering employees and supporting their health and wellbeing.
sfas	Safety assessment	Development and implementation	Systems development	Assessing safety-related software and hardware systems to determine compliance with standards and required levels of safety integrity.
prod	Product management	Development and implementation	Systems development	Managing and developing products or services through their full life cycle from inception, growth, maturity, decline to retirement.
psol	Problem solving	Soft skills	\N	Problem solving involves the ability to analyze complex problems, identify root causes, and develop solutions. In the IT field, strong problem-solving skills are essential for resolving technical issues and ensuring the quality of work.
slmo	Service level management	Delivery and operation	Service management	Agreeing targets for service levels and assessing, monitoring, and managing the delivery of services against the targets.
flex	Flexibility	Soft skills	\N	Flexibility involves the ability to adapt to changes and new situations. In the IT field, flexibility is important for quickly adapting to new technologies and processes.
stpl	Enterprise and business architecture	Strategy and architecture	Strategy and planning	Aligning an organisation's technology strategy with its business mission, strategy, and processes and documenting this using architectural models.
slen	Systems and software life cycle engineering	Development and implementation	Systems development	Establishing and deploying an environment for developing, continually improving, and securely operating software and systems products and services.
arch	Solution architecture	Strategy and architecture	Strategy and planning	Developing and communicating a multi-dimensional solution architecture to deliver agreed business outcomes.
ocdv	Organisational capability development	Change and transformation	Change planning	Providing leadership, advice and implementation support to assess organisational capabilities and to identify, prioritise and implement improvements.
itcm	Contract management	Relationships and engagement	Stakeholder management	Managing and controlling the operation of formal contracts for the supply of products and services.
mktg	Marketing	Relationships and engagement	Sales and marketing	Researching, analysing and stimulating potential or existing markets for products and services.
chad	Change adaptivity	Soft skills	\N	Change adaptivity involves the ability to quickly adapt to new situations and changes. In the IT field, change adaptivity is important for keeping up with the rapidly evolving technology landscape.
ntas	Network support	Delivery and operation	Technology management	Providing maintenance and support services for communications networks.
bsmo	Business modelling	Change and transformation	Change analysis	Producing abstract or distilled representations of real-world, business or gaming situations.
leda	Competency assessment	People and skills	Skills management	Assessing knowledge, skills, competency and behaviours by any means, whether formal or informal, against frameworks such as SFIA.
etdl	Learning delivery	People and skills	Skills management	Transferring knowledge, developing skills and changing behaviours using a range of techniques, resources and media.
prof	Portfolio, programme and project support	Change and transformation	Change implementation	Providing support and guidance on portfolio, programme and project management processes, procedures, tools and techniques.
seac	Service acceptance	Delivery and operation	Service management	Managing the process to obtain formal confirmation that service acceptance criteria have been met.
scmo	Scientific modelling	Development and implementation	Computational science	Applying computer simulation and other forms of computation to solve real-world problems in scientific disciplines.
admn	Business administration	Relationships and engagement	Stakeholder management	Managing and performing administrative services and tasks to enable individuals, teams and organisations to succeed in their objectives.
subf	Subject formation	People and skills	Skills management	Specifying, designing and developing curricula within a structured and systematic education environment.
nuan	Numerical analysis	Development and implementation	Computational science	Creating, analysing, implementing, testing and improving algorithms for numerically solving mathematical problems.
inva	Investment appraisal	Strategy and architecture	Strategy and planning	Assessing the attractiveness of possible investments or projects.
usev	User experience evaluation	Development and implementation	User experience	Validating systems, products or services against user experience goals, metrics and targets.
usup	Incident management	Delivery and operation	Service management	Coordinating responses to incident reports, minimising negative impacts and restoring service as quickly as possible.
knsh	Knowledge sharing	Soft skills	\N	Knowledge sharing involves the willingness to share information and expertise with others. In the IT field, knowledge sharing can help build strong teams and enhance overall productivity.
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: skillcollector
--

COPY public.users (user_id, user_hash) FROM stdin;
1	0123456789
\.


--
-- Data for Name: users_credentials; Type: TABLE DATA; Schema: public; Owner: skillcollector
--

COPY public.users_credentials (id, username, password) FROM stdin;
\.


--
-- Name: users_credentials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skillcollector
--

SELECT pg_catalog.setval('public.users_credentials_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skillcollector
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- Name: ratings ratings_user_hash_skill_id_key; Type: CONSTRAINT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_hash_skill_id_key UNIQUE (user_hash, skill_id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: users_credentials users_credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.users_credentials
    ADD CONSTRAINT users_credentials_pkey PRIMARY KEY (id);


--
-- Name: users_credentials users_credentials_username_key; Type: CONSTRAINT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.users_credentials
    ADD CONSTRAINT users_credentials_username_key UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_user_hash_key; Type: CONSTRAINT; Schema: public; Owner: skillcollector
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_hash_key UNIQUE (user_hash);


--
-- PostgreSQL database dump complete
--

