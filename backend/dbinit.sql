--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-05-09 06:26:18

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

--
-- TOC entry 5 (class 2615 OID 16394)
-- Name: todo_project; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA todo_project;


ALTER SCHEMA todo_project OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16501)
-- Name: tasks; Type: TABLE; Schema: todo_project; Owner: postgres
--

CREATE TABLE todo_project.tasks (
    task_id integer NOT NULL,
    name character varying(50) NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    user_id integer
);


ALTER TABLE todo_project.tasks OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16500)
-- Name: tasks_task_id_seq; Type: SEQUENCE; Schema: todo_project; Owner: postgres
--

CREATE SEQUENCE todo_project.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todo_project.tasks_task_id_seq OWNER TO postgres;

--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 213
-- Name: tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: todo_project; Owner: postgres
--

ALTER SEQUENCE todo_project.tasks_task_id_seq OWNED BY todo_project.tasks.task_id;


--
-- TOC entry 212 (class 1259 OID 16396)
-- Name: users; Type: TABLE; Schema: todo_project; Owner: postgres
--

CREATE TABLE todo_project.users (
    user_id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(256) NOT NULL,
    email character varying(50) NOT NULL
);


ALTER TABLE todo_project.users OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16395)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: todo_project; Owner: postgres
--

CREATE SEQUENCE todo_project.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todo_project.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: todo_project; Owner: postgres
--

ALTER SEQUENCE todo_project.users_user_id_seq OWNED BY todo_project.users.user_id;


--
-- TOC entry 3172 (class 2604 OID 16504)
-- Name: tasks task_id; Type: DEFAULT; Schema: todo_project; Owner: postgres
--

ALTER TABLE ONLY todo_project.tasks ALTER COLUMN task_id SET DEFAULT nextval('todo_project.tasks_task_id_seq'::regclass);


--
-- TOC entry 3171 (class 2604 OID 16399)
-- Name: users user_id; Type: DEFAULT; Schema: todo_project; Owner: postgres
--

ALTER TABLE ONLY todo_project.users ALTER COLUMN user_id SET DEFAULT nextval('todo_project.users_user_id_seq'::regclass);


--
-- TOC entry 3325 (class 0 OID 16501)
-- Dependencies: 214
-- Data for Name: tasks; Type: TABLE DATA; Schema: todo_project; Owner: postgres
--

COPY todo_project.tasks (task_id, name, completed, user_id) FROM stdin;
1	tarea 1	f	1
2	tarea 2	f	1
\.


--
-- TOC entry 3323 (class 0 OID 16396)
-- Dependencies: 212
-- Data for Name: users; Type: TABLE DATA; Schema: todo_project; Owner: postgres
--

COPY todo_project.users (user_id, username, password, email) FROM stdin;
2	usuario	$2b$10$oZVx6A5g6iFlvo4yNtbblewtp6NM.p4vK/FfclcAh9O9V6skf70Uy	user2@mail.com
3	usuario 3	$2b$10$iTvbKRpe6LBd7BoF1UDSBOGum31c63zX/hb0xmSgPNBluhvYW6HUS	mail@mail.com
1	jefry	$2b$10$iTvbKRpe6LBd7BoF1UDSBOGum31c63zX/hb0xmSgPNBluhvYW6HUS	jefry@mail.com
\.


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 213
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: todo_project; Owner: postgres
--

SELECT pg_catalog.setval('todo_project.tasks_task_id_seq', 3, true);


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: todo_project; Owner: postgres
--

SELECT pg_catalog.setval('todo_project.users_user_id_seq', 3, true);


--
-- TOC entry 3181 (class 2606 OID 16506)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: todo_project; Owner: postgres
--

ALTER TABLE ONLY todo_project.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);


--
-- TOC entry 3175 (class 2606 OID 16535)
-- Name: users unq_email; Type: CONSTRAINT; Schema: todo_project; Owner: postgres
--

ALTER TABLE ONLY todo_project.users
    ADD CONSTRAINT unq_email UNIQUE (email);


--
-- TOC entry 3177 (class 2606 OID 16533)
-- Name: users unq_username; Type: CONSTRAINT; Schema: todo_project; Owner: postgres
--

ALTER TABLE ONLY todo_project.users
    ADD CONSTRAINT unq_username UNIQUE (username);


--
-- TOC entry 3179 (class 2606 OID 16401)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: todo_project; Owner: postgres
--

ALTER TABLE ONLY todo_project.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3182 (class 2606 OID 16544)
-- Name: tasks fk_tasks_users; Type: FK CONSTRAINT; Schema: todo_project; Owner: postgres
--

ALTER TABLE ONLY todo_project.tasks
    ADD CONSTRAINT fk_tasks_users FOREIGN KEY (user_id) REFERENCES todo_project.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2022-05-09 06:26:18

--
-- PostgreSQL database dump complete
--

