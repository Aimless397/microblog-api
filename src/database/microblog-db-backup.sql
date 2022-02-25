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
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, uuid, email, password, first_name, last_name, public, role, email_public, name_public, verified, created_at, updated_at) FROM stdin;
1	3a25b573-bdd2-4fad-afa7-415eba224d51	douglas@gmail.com	$2a$10$TJ8blcuJyNV3GyujY/bq3uMNKXFUd1P1Enq/1HSUvU1emgG5vCp7W	Douglas	Zuniga	t	user	t	t	f	2022-02-24 06:14:04.9	2022-02-24 06:14:04.902
2	899ff088-7274-421a-8045-9ab765be02fd	douglas2@gmail.com	$2a$10$6ewb4o1DOvmRDvw8rDIvTeTl9RDi4q3xxDOLmZ2e97apG0G1UGV/i	Douglas	Zuniga	t	user	t	t	f	2022-02-24 06:15:05.919	2022-02-24 06:15:05.92
3	88f113f2-c6dc-46ff-9f7a-8a8f7e12a6de	douglas3@gmail.com	$2a$10$sDmLDHAgMGOdR.eVn/Ndx.uScu2.JFqb4gHRl6b18jc4YBZu3qpnK	Douglas	Zuniga	t	user	t	t	f	2022-02-24 06:24:38.115	2022-02-24 06:24:38.116
4	84bb939f-8b72-463b-a52b-aa2fd09b8bd9	carlos@gmail.com	$2a$10$GmL8v2PUHZV8zt4V9Tv9de0JRoWGbLWZ6hVXjn7QvZDiKB.1b8HvG	Carlos	Zapata	t	user	t	t	f	2022-02-24 06:32:05.597	2022-02-24 06:32:05.598
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

SELECT pg_catalog.setval('public.posts_id_seq', 1, false);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


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

