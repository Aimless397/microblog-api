--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: comment_reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment_reactions (
    id integer NOT NULL,
    uuid text NOT NULL,
    user_id text NOT NULL,
    comment_id text NOT NULL,
    status text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.comment_reactions OWNER TO postgres;

--
-- Name: comment_reactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_reactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_reactions_id_seq OWNER TO postgres;

--
-- Name: comment_reactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_reactions_id_seq OWNED BY public.comment_reactions.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    uuid text NOT NULL,
    user_id text NOT NULL,
    content text NOT NULL,
    completed boolean NOT NULL,
    likes integer NOT NULL,
    dislikes integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    post_id text NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: post_reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_reactions (
    id integer NOT NULL,
    uuid text NOT NULL,
    user_id text NOT NULL,
    post_id text NOT NULL,
    status text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.post_reactions OWNER TO postgres;

--
-- Name: post_reactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_reactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_reactions_id_seq OWNER TO postgres;

--
-- Name: post_reactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_reactions_id_seq OWNED BY public.post_reactions.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    uuid text NOT NULL,
    user_id text NOT NULL,
    content text NOT NULL,
    completed boolean NOT NULL,
    likes integer NOT NULL,
    dislikes integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    uuid text NOT NULL,
    user_id text NOT NULL,
    jti text NOT NULL,
    aud text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    uuid text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    public boolean DEFAULT false NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    email_public boolean DEFAULT false NOT NULL,
    name_public boolean DEFAULT false NOT NULL,
    verified boolean NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comment_reactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_reactions ALTER COLUMN id SET DEFAULT nextval('public.comment_reactions_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: post_reactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reactions ALTER COLUMN id SET DEFAULT nextval('public.post_reactions_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7a153cfc-4b26-4e09-8e4c-d3691001f1fb	534fb531aaaa8070f6674a3bafd7c02d3a2f968bf3884d07921fa84943a07556	2022-02-23 16:25:07.249412-05	20220221233220_create_tokens_table	\N	\N	2022-02-23 16:25:07.239163-05	1
165abc66-86e2-45ce-9645-b5210f4a9d22	68c9f4548e71083ed10756cf1e03eb36f6d5c6468ed983d499e55909deba9b86	2022-02-23 16:25:07.256617-05	20220221233348_create_posts_table	\N	\N	2022-02-23 16:25:07.249871-05	1
2d19bd7d-c64c-4d54-8df2-97f144afce63	624331392065b38a8c2c31c493ffbeda9597b65c239d081afa8821a3d688a48b	2022-02-23 16:25:07.26968-05	20220221233956_create_users_table	\N	\N	2022-02-23 16:25:07.257125-05	1
60c3416f-ca94-4bf0-8301-48172fe3d0e9	840f6a5039742d5834a652a7e8213cc85d8580761548959b50047d132699b898	2022-02-23 16:25:07.300946-05	20220222000840_create_comments_table	\N	\N	2022-02-23 16:25:07.270359-05	1
15d47f8b-bcab-43ee-b596-3bf86dcf51ca	59866e11f7a8fbb0aa94ff7d4af6cf7723ab4901a44925717d68dd388b3975da	2022-02-23 16:25:07.313709-05	20220222003555_create_post_reactions_table	\N	\N	2022-02-23 16:25:07.301498-05	1
e25e8b5f-97b5-47f4-82f6-f8a76e10f808	7e23129000e1b6fa3adecdba5dbd31f63170645da0cf13890c92b08766c76e36	2022-02-23 16:25:07.324028-05	20220222004408_create_comment_reactions_table	\N	\N	2022-02-23 16:25:07.314282-05	1
aab587b3-a0ba-422c-8230-4eba15b05909	e0cf298d9e6b1e6820c860f6da7df7273c201e9aec8e451260b159d23452392e	2022-02-23 19:59:48.936574-05	20220224005948_field_username_removed	\N	\N	2022-02-23 19:59:48.934392-05	1
\.


--
-- Data for Name: comment_reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment_reactions (id, uuid, user_id, comment_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, uuid, user_id, content, completed, likes, dislikes, created_at, updated_at, post_id) FROM stdin;
\.


--
-- Data for Name: post_reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_reactions (id, uuid, user_id, post_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, uuid, user_id, content, completed, likes, dislikes, created_at, updated_at) FROM stdin;
2	b0f6b48b-53aa-4209-af59-6bb330ff0bc9	3a25b573-bdd2-4fad-afa7-415eba224d51	Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora iure error libero ut nulla doloribus omnis autem odio earum perferendis quidem dolore temporibus, accusamus numquam, maiores praesentium quaerat quis.	t	0	0	2022-02-26 00:29:30.733	2022-02-26 00:29:30.734
3	4ddfdd38-95c2-48e2-9bcf-d928f8b2342d	3a25b573-bdd2-4fad-afa7-415eba224d51	Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus amet corporis cumque id, maxime quisquam laborum beatae iusto vel! Nemo eos est, quidem incidunt soluta nesciunt natus ratione nostrum nisi.	t	0	0	2022-02-26 00:29:40.938	2022-02-26 00:29:40.939
4	d615b34e-f29d-488c-ac8f-7f84654c57f5	3a25b573-bdd2-4fad-afa7-415eba224d51	Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio alias aperiam cumque sed accusamus architecto rerum omnis veritatis fugiat ipsam modi aliquid debitis tempore asperiores, ad cupiditate. Doloribus, quae libero?	t	0	0	2022-02-26 00:29:49.263	2022-02-26 00:29:49.264
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, uuid, user_id, jti, aud, created_at, updated_at) FROM stdin;
1	802be96e-cf28-4f9d-ba0e-ec860a337b96	3a25b573-bdd2-4fad-afa7-415eba224d51	c2792ae5-ce8a-4e12-bf3a-a6d040db85e5	\N	2022-02-24 06:14:04.916	2022-02-24 06:14:04.916
2	5102d8dd-d1af-4ec4-bf14-77651a9e61a2	899ff088-7274-421a-8045-9ab765be02fd	ae7cf6c8-4e61-4977-a6b9-1be38757cc2f	\N	2022-02-24 06:15:05.921	2022-02-24 06:15:05.922
3	f779c05e-4107-4aaa-8c38-9700c85f1251	88f113f2-c6dc-46ff-9f7a-8a8f7e12a6de	67e83d20-e604-4270-b234-2a94adefba61	\N	2022-02-24 06:24:38.121	2022-02-24 06:24:38.121
4	a5043bba-d7d8-44c6-8b58-8e30acf44bd8	3a25b573-bdd2-4fad-afa7-415eba224d51	b3374169-5684-49a6-880e-fbff2ce38f94	\N	2022-02-24 06:30:52.742	2022-02-24 06:30:52.743
5	d581b963-6ad3-4dcc-94dc-bccc4cfb8924	84bb939f-8b72-463b-a52b-aa2fd09b8bd9	842eb047-facf-41c1-8d82-2081fcd47554	\N	2022-02-24 06:32:05.6	2022-02-24 06:32:05.6
6	12e53f07-4376-4ad5-a4e5-af1ab4fcdc30	3a25b573-bdd2-4fad-afa7-415eba224d51	de974958-08ed-404f-8b12-6f2b12c12cb7	\N	2022-02-24 20:04:45.692	2022-02-24 20:04:45.693
9	0e9b4718-c37d-4cb0-9f14-91a6bbbf313f	3a25b573-bdd2-4fad-afa7-415eba224d51	e8137d14-00e0-4340-96c7-2ca5847e8bfc	\N	2022-02-24 21:02:05.503	2022-02-24 21:02:05.503
10	1eb1c523-4df3-4e89-97c2-05debcdee58a	3a25b573-bdd2-4fad-afa7-415eba224d51	6f75a1c3-f219-41d5-9a34-50d4dfed57ad	\N	2022-02-24 22:05:41.604	2022-02-24 22:05:41.605
11	90538b43-dc13-4ef2-97e7-3d432f1a70b9	3a25b573-bdd2-4fad-afa7-415eba224d51	6123eb2f-5499-43a5-99dd-b29c7128ad48	\N	2022-02-24 22:17:38.142	2022-02-24 22:17:38.143
16	59b333ba-40d4-41fa-90dc-b959b51010a5	3a25b573-bdd2-4fad-afa7-415eba224d51	15185320-2259-4b17-9b6a-c1c046ac334b	\N	2022-02-24 22:22:13.201	2022-02-24 22:22:13.201
17	498402c5-1924-4d24-9359-e489065fff12	3a25b573-bdd2-4fad-afa7-415eba224d51	38452316-4383-4f9c-9996-3eac33fb28d7	\N	2022-02-24 23:23:47.512	2022-02-24 23:23:47.513
18	43a50459-7fa6-4f08-bf1e-1a1d53a97227	3a25b573-bdd2-4fad-afa7-415eba224d51	df9e6cad-b377-49db-ad06-2886087d2d7f	\N	2022-02-25 07:17:22.817	2022-02-25 07:17:22.818
19	0a0894c5-6894-4a1d-ab53-fb11f2eeae0a	3a25b573-bdd2-4fad-afa7-415eba224d51	e6ff4089-60bf-4963-895f-42ad5f8550a3	\N	2022-02-25 08:10:40.831	2022-02-25 08:10:40.832
22	c2b27c3d-f600-4ce0-9c69-f5876f707e0e	3a25b573-bdd2-4fad-afa7-415eba224d51	d052c915-c26a-4393-bfbf-aeb0c21ae9e2	\N	2022-02-25 08:54:30.648	2022-02-25 08:54:30.648
23	3be509b5-b89a-47bb-b4aa-7ebddff7c641	3a25b573-bdd2-4fad-afa7-415eba224d51	6dda83d0-d037-42b7-a5df-14a95c7d1a21	\N	2022-02-25 08:55:36.247	2022-02-25 08:55:36.247
24	cb922123-658d-4200-ad8b-0c2a1bab7550	3a25b573-bdd2-4fad-afa7-415eba224d51	9d1202da-d3ac-4153-adea-17daa350e180	\N	2022-02-25 08:58:46.518	2022-02-25 08:58:46.518
25	955cb1f1-cd54-4d21-8517-64c788e35382	3a25b573-bdd2-4fad-afa7-415eba224d51	e9e17d0a-1413-4406-8065-ff69973ec1ec	\N	2022-02-25 08:59:37.088	2022-02-25 08:59:37.089
26	d94fd92f-e8ef-4ccf-a9e2-9a134a56b683	84bb939f-8b72-463b-a52b-aa2fd09b8bd9	a0f2c4ee-deb6-49de-a2a2-3dbc258e96f4	\N	2022-02-25 09:03:08.866	2022-02-25 09:03:08.867
27	e8368be4-7cb9-4e23-800c-033f1f165925	3a25b573-bdd2-4fad-afa7-415eba224d51	a3c5eeb6-eff3-4db0-99d2-a2f595a679f9	\N	2022-02-25 09:10:44.589	2022-02-25 09:10:44.59
28	bab509d6-e5b8-4162-b1f8-230a543b2e20	3a25b573-bdd2-4fad-afa7-415eba224d51	df69c920-e937-4b6c-a170-fa135204870b	\N	2022-02-25 18:44:10.035	2022-02-25 18:44:10.036
29	860ded9f-64f0-4c33-9b53-e4c4f7afdcd0	202edab7-edb3-4b4c-a560-5e3659e097bf	72506c2e-f2c6-464c-b8ab-2627ee90e2f4	\N	2022-02-25 18:46:25.107	2022-02-25 18:46:25.107
30	fc1901a3-1350-42bb-a279-161cc3f76f29	202edab7-edb3-4b4c-a560-5e3659e097bf	9b4a1eda-35d3-4819-b739-89990ea413ba	\N	2022-02-25 18:47:28.925	2022-02-25 18:47:28.926
31	6d3effed-c18d-40c2-a593-14aba492212a	3a25b573-bdd2-4fad-afa7-415eba224d51	df366075-4687-4172-bfd8-9d73c7dd1bb3	\N	2022-02-25 18:48:48.739	2022-02-25 18:48:48.739
32	496296f5-287d-433b-9cbc-2e6836c11382	3a25b573-bdd2-4fad-afa7-415eba224d51	544f3d29-66ce-46a7-a695-820576e5c45f	\N	2022-02-25 23:59:50.909	2022-02-25 23:59:50.91
33	1f67f20c-2f54-492a-88f2-7ef92d513d35	84bb939f-8b72-463b-a52b-aa2fd09b8bd9	c8f4d089-744c-4a9f-9922-721545df7bb6	\N	2022-02-26 00:02:43.555	2022-02-26 00:02:43.556
34	a52784f9-505b-44d0-9a3a-d5f2e8601a83	3a25b573-bdd2-4fad-afa7-415eba224d51	15148905-7441-4f4c-8677-a6efc33e93d8	\N	2022-02-26 00:03:42.161	2022-02-26 00:03:42.162
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, uuid, email, password, first_name, last_name, public, role, email_public, name_public, verified, created_at, updated_at) FROM stdin;
2	899ff088-7274-421a-8045-9ab765be02fd	douglas2@gmail.com	$2a$10$6ewb4o1DOvmRDvw8rDIvTeTl9RDi4q3xxDOLmZ2e97apG0G1UGV/i	Douglas	Zuniga	t	user	t	t	f	2022-02-24 06:15:05.919	2022-02-24 06:15:05.92
3	88f113f2-c6dc-46ff-9f7a-8a8f7e12a6de	douglas3@gmail.com	$2a$10$sDmLDHAgMGOdR.eVn/Ndx.uScu2.JFqb4gHRl6b18jc4YBZu3qpnK	Douglas	Zuniga	t	user	t	t	f	2022-02-24 06:24:38.115	2022-02-24 06:24:38.116
4	84bb939f-8b72-463b-a52b-aa2fd09b8bd9	carlos@gmail.com	$2a$10$GmL8v2PUHZV8zt4V9Tv9de0JRoWGbLWZ6hVXjn7QvZDiKB.1b8HvG	Carlos	Zapata	t	user	t	t	f	2022-02-24 06:32:05.597	2022-02-24 06:32:05.598
1	3a25b573-bdd2-4fad-afa7-415eba224d51	douglas@gmail.com	$2a$10$TJ8blcuJyNV3GyujY/bq3uMNKXFUd1P1Enq/1HSUvU1emgG5vCp7W	Douglas	Zuniga	t	user	t	t	t	2022-02-24 06:14:04.9	2022-02-25 18:45:47.222
5	202edab7-edb3-4b4c-a560-5e3659e097bf	douglaszuniga@ravn.co	$2a$10$RbJ5GBHK5wYcscvxB7Lm6.ygH9.1Oh1U0OKBhlBZp1iyjRQPleIL6	Douglas	Zuniga	t	user	t	t	t	2022-02-25 18:46:25.099	2022-02-25 18:48:07.832
\.


--
-- Name: comment_reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_reactions_id_seq', 1, false);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: post_reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_reactions_id_seq', 1, false);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 4, true);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 34, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: comment_reactions comment_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_reactions
    ADD CONSTRAINT comment_reactions_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: post_reactions post_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reactions
    ADD CONSTRAINT post_reactions_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comment_reactions_uuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX comment_reactions_uuid_key ON public.comment_reactions USING btree (uuid);


--
-- Name: comments_uuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX comments_uuid_key ON public.comments USING btree (uuid);


--
-- Name: post_reactions_uuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX post_reactions_uuid_key ON public.post_reactions USING btree (uuid);


--
-- Name: posts_uuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX posts_uuid_key ON public.posts USING btree (uuid);


--
-- Name: tokens_jti_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tokens_jti_key ON public.tokens USING btree (jti);


--
-- Name: tokens_uuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tokens_uuid_key ON public.tokens USING btree (uuid);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_uuid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_uuid_key ON public.users USING btree (uuid);


--
-- Name: comment_reactions comment_reactions_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_reactions
    ADD CONSTRAINT comment_reactions_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: comment_reactions comment_reactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_reactions
    ADD CONSTRAINT comment_reactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: post_reactions post_reactions_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reactions
    ADD CONSTRAINT post_reactions_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: post_reactions post_reactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reactions
    ADD CONSTRAINT post_reactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tokens tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

