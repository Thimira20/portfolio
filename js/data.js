/**
 * Portfolio Data: Thimira (T.N. Panditha)
 * Computer Engineering UG | Backend Developer | Network Security Engineer | Security Engineer
 * GitHub: https://github.com/Thimira20
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "T.N. Panditha",
    handle: "Thimira20",
    role: "Backend Developer & Network Security Engineer",
    subRoles: [
      "Network Security Engineer",
      "Distributed Backend Developer",
      "Cybersecurity Researcher",
      "Systems Programmer"
    ],
    status: "OPEN FOR ENGINEERING OPPORTUNITIES",
    location: "Department of Computer Engineering",
    github: "https://github.com/Thimira20",
    linkedin: "https://linkedin.com/in/thimira-panditha",
    email: "thimirapanditha20@gmail.com",
    avatar: "./thimir-opt.png",
    bio: "Computer Engineering undergraduate focused on engineering fault-tolerant distributed backends, robust network infrastructures, and zero-trust security architectures. Experienced in building event-driven streaming pipelines with Apache Kafka, automating complex enterprise networks with Ansible & Netmiko, and researching cryptographic communications in Software-Defined Vehicular Networks (SDVN)."
  },

  stats: [
    { label: "Public Repositories", value: "36+", icon: "code" },
    { label: "Core Focus", value: "SecOps & Backend", icon: "shield" },
    { label: "Network Automation", value: "Ansible & Netmiko", icon: "server" },
    { label: "Distributed Pipelines", value: "Kafka & Docker", icon: "cpu" }
  ],

  pillars: [
    {
      id: "net-sec",
      title: "Network Security & Infrastructure",
      icon: "shield",
      badge: "SECURITY CORE",
      description: "Designing zero-trust enterprise topologies, strict Access Control Lists (ACLs), multi-VLAN segmentation, NAT edge gateways, and telemetry monitoring with Zabbix and automated Netmiko scripts.",
      skills: ["Cisco Packet Tracer", "Ansible Automation", "Netmiko / Python", "ACL Matrices", "VLAN / L3 Routing", "Zabbix Telemetry", "NAT & Firewalling"]
    },
    {
      id: "distributed-sys",
      title: "Distributed Backend & Streaming",
      icon: "layers",
      badge: "ARCHITECTURE",
      description: "Developing scalable microservices, event-driven streaming pipelines with Apache Kafka and Avro schemas, high-concurrency Node.js/Java backends, and containerized CI/CD workflows.",
      skills: ["Apache Kafka", "Apache Avro", "Docker & Compose", "Jenkins CI/CD", "Node.js / Express", "Java Spring / Sockets", "PostgreSQL / MongoDB"]
    },
    {
      id: "systems-crypto",
      title: "Systems & Security Engineering",
      icon: "cpu",
      badge: "SYSTEMS & PROTOCOLS",
      description: "Implementing cryptographic handshakes in SDVN (Software-Defined Vehicular Networks), custom low-level C++ data structures & memory management, and secure multithreaded socket servers.",
      skills: ["SDVN Cryptography", "C++ Low-Level Systems", "Multi-Threaded Sockets", "Authentication & JWT", "Python AsyncIO", "Wireshark Packet Analysis"]
    }
  ],

  skillsMatrix: {
    "Network & Security Engineering": [
      { name: "Network Automation (Ansible & Netmiko)", level: 92 },
      { name: "Cisco Routing & L3 Switching", level: 90 },
      { name: "Access Control Lists (ACL) & Firewalling", level: 88 },
      { name: "Software Defined Vehicular Networks (SDVN)", level: 85 },
      { name: "VLAN Segmentation & Trunking", level: 90 },
      { name: "Zabbix Telemetry & Network Monitoring", level: 84 },
      { name: "Wireshark Protocol & Packet Inspection", level: 85 }
    ],
    "Distributed Systems & Backend": [
      { name: "Node.js & Express RESTful APIs", level: 94 },
      { name: "Apache Kafka & Event Streaming", level: 86 },
      { name: "Docker & Container Orchestration", level: 88 },
      { name: "Jenkins CI/CD Pipeline Automation", level: 82 },
      { name: "WebSocket & Duplex Streaming", level: 88 },
      { name: "Java Systems & Spring Ecosystem", level: 84 },
      { name: "Python Network & Async Backend", level: 89 }
    ],
    "Systems, Data & Languages": [
      { name: "C++ (Custom Data Structures & Memory)", level: 87 },
      { name: "Python (ETL Pipelines, ML Churn)", level: 90 },
      { name: "TypeScript / Modern JavaScript", level: 89 },
      { name: "SQL (PostgreSQL / MySQL) & Query Tuning", level: 86 },
      { name: "Dart / Flutter (Cross-platform Mobile)", level: 80 },
      { name: "Linux Administration & Bash Scripting", level: 88 }
    ]
  },

  projects: [
    {
      id: "data-networks",
      name: "Data-Networks-Project",
      title: "Enterprise Network Infrastructure & Automation Suite",
      category: "network-security",
      categoryName: "Network Security & Infrastructure",
      featured: true,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Data-Networks-Project",
      live: null,
      summary: "Comprehensive multi-tier enterprise network architecture featuring Ansible automation, Netmiko scripts, L3 distribution switching, ACL matrices, inter-VLAN routing, and Zabbix telemetry.",
      tech: ["Ansible", "Netmiko", "Python", "Cisco Packet Tracer", "Zabbix", "ACL", "VLAN", "NAT"],
      architecture: {
        highlights: [
          "Automated configuration deployment across multi-switch topologies using Ansible playbooks and Netmiko Python scripts.",
          "Designed comprehensive 4x4 Reachability Test Matrix verifying end-to-end subnet isolation and routing convergence.",
          "Engineered L3 Distribution Switch Conversion with active-active trunking and Layer-3 switched virtual interfaces (SVIs).",
          "Hardened perimeter via strict Access Control Lists (ACLs) restricting unauthorized subnet traversal and segmenting administrative zones.",
          "Integrated Zabbix monitoring server for continuous SNMP polling, interface utilization tracking, and latency alerting."
        ],
        problem: "Manual network configuration across distributed enterprise tiers leads to configuration drift, security misconfigurations, and delayed incident triage.",
        solution: "Established infrastructure-as-code automation and real-time telemetry with Netmiko, Ansible, and Zabbix, paired with strict ACL segmentation."
      }
    },
    {
      id: "sdvn-secure",
      name: "SDVN-Secure-Communication",
      title: "Software-Defined Vehicular Network Secure Channel Protocol",
      category: "network-security",
      categoryName: "Security Engineering",
      featured: true,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/SDVN-Secure-Communication",
      live: null,
      summary: "Research and protocol implementation for secure, tamper-proof communications across Software-Defined Vehicular Networks (SDVN) utilizing cryptographic handshakes and SDN controllers.",
      tech: ["Python", "Cryptography", "SDN / SDVN", "Network Protocols", "Security Modeling"],
      architecture: {
        highlights: [
          "Developed secure message exchange protocols for vehicle-to-vehicle (V2V) and vehicle-to-infrastructure (V2I) topologies.",
          "Integrated cryptographic signature verification to prevent spoofing, Sybil attacks, and man-in-the-middle (MITM) packet tampering.",
          "Leveraged SDN decoupling of control and data planes to dynamically push security policy updates across roadside units (RSUs).",
          "Minimized handshake latency overhead to satisfy real-time safety critical vehicle telemetry requirements."
        ],
        problem: "Vehicular networks operate over volatile wireless links vulnerable to packet injection, impersonation, and eavesdropping.",
        solution: "Engineered an SDVN-orchestrated authentication and cryptographic handshake scheme guaranteeing integrity and low-latency packet delivery."
      }
    },
    {
      id: "kafka-system",
      name: "Kafka-based-system",
      title: "Event-Driven Distributed Streaming Architecture",
      category: "backend-systems",
      categoryName: "Distributed Backend",
      featured: true,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Kafka-based-system",
      live: null,
      summary: "Distributed event streaming system built with Apache Kafka and Apache Avro schemas, ensuring strict message serialization, order guarantees, and decoupled processing.",
      tech: ["Java", "Apache Kafka", "Apache Avro", "Distributed Systems", "Schema Registry"],
      architecture: {
        highlights: [
          "Configured multi-broker Kafka cluster with topic partition balancing and fault-tolerant consumer group rebalancing.",
          "Enforced strict data contracts using Apache Avro schemas (`kafka-avro-orders`) to prevent schema drift and breaking API changes.",
          "Implemented at-least-once and idempotent event delivery semantics for critical transactional records.",
          "Optimized producer batching and linger settings to achieve high throughput under simulated message spikes."
        ],
        problem: "Tightly coupled monolith architectures fail under peak traffic bursts and lack real-time auditability across services.",
        solution: "Adopted Kafka pub-sub streaming with backward-compatible Avro schemas for scalable, resilient asynchronous order processing."
      }
    },
    {
      id: "scalable-results",
      name: "Scalable-Result-issuing-system-for-universities.",
      title: "Resilient University Grade Issuance Microservices",
      category: "backend-systems",
      categoryName: "Distributed Backend & DevOps",
      featured: true,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Scalable-Result-issuing-system-for-universities.",
      live: null,
      summary: "High-throughput, containerized university result dissemination system with Docker Compose orchestration, automated Jenkins CI/CD pipeline, and resilient database caching.",
      tech: ["JavaScript", "Node.js", "Docker", "Docker Compose", "Jenkins CI/CD", "PostgreSQL", "Nginx"],
      architecture: {
        highlights: [
          "Engineered microservices architecture decoupled into authentication, result computation, and PDF generation services.",
          "Automated container build, testing, and artifact deployment using a declarative `Jenkinsfile` CI/CD pipeline.",
          "Constructed isolated multi-container production environments using `docker-compose.prod.yml`.",
          "Designed database indexing and connection pooling to withstand sudden traffic spikes during nationwide exam result releases."
        ],
        problem: "University portals crash during exam release events due to database connection exhaustion and synchronous computation bottlenecks.",
        solution: "Decoupled computation into asynchronous microservices backed by Docker containerization, connection pooling, and automated CI/CD."
      }
    },
    {
      id: "hospital-pipeline",
      name: "hospital-patients-data-processing",
      title: "Healthcare Patient Data Processing & Telemetry Pipeline",
      category: "backend-systems",
      categoryName: "Data Pipelines & Observability",
      featured: true,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/hospital-patients-data-processing",
      live: null,
      summary: "Enterprise medical data ingestion and processing pipeline complete with observability monitoring, SQL serving layer, orchestration, and Docker deployment.",
      tech: ["Python", "Docker", "SQL", "Orchestration", "Data Ingestion", "Observability", "ETL"],
      architecture: {
        highlights: [
          "Built multi-stage data ingestion layer capable of cleaning, validating, and normalizing clinical patient records.",
          "Integrated structured observability and telemetry logging for real-time audit logging and pipeline health monitoring.",
          "Implemented declarative SQL schema migrations and serving endpoints for secure downstream analytics.",
          "Containerized the entire stack with Docker Compose and modular Python packaging via `pyproject.toml`."
        ],
        problem: "Healthcare organizations struggle with fragmented patient metrics, unstandardized medical feeds, and non-compliant audit trails.",
        solution: "Established a HIPAA-minded structured ETL ingestion pipeline with continuous observability and declarative schema verification."
      }
    },
    {
      id: "hotel-cpp",
      name: "Hotel-Mangement-System",
      title: "Bespoke C++ Core Systems & Memory Architecture",
      category: "systems-iot",
      categoryName: "Systems & Algorithms",
      featured: true,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Hotel-Mangement-System",
      live: null,
      summary: "High-performance systems project developed in modern C++, featuring custom-engineered data structures and algorithms built from scratch without external libraries.",
      tech: ["C++", "Data Structures", "Algorithms", "Memory Management", "Systems Programming"],
      architecture: {
        highlights: [
          "Constructed custom dynamic linked structures, hash indices, and search trees without relying on external STL abstractions.",
          "Enforced strict memory allocation and deallocation to prevent pointer dangling and memory leakage.",
          "Engineered algorithmic lookup time complexity optimizations for reservation scheduling and room allocation.",
          "Structured clean modular object-oriented architecture prioritizing separation of concerns and data integrity."
        ],
        problem: "Demonstrating deep foundational mastery of computer engineering data structures and hardware-level memory management.",
        solution: "Handcrafted foundational algorithms and memory management structures from first principles in native C++."
      }
    },
    {
      id: "iot-home",
      name: "Smart-Home-Management-system-using-IoT-device-Server-",
      title: "IoT Sensor Gateway & Device Telemetry Server",
      category: "systems-iot",
      categoryName: "IoT & Systems",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Smart-Home-Management-system-using-IoT-device-Server-",
      live: null,
      summary: "Multi-threaded Java IoT server managing concurrent telemetry feeds from smart home sensors and orchestrating automated relay actuators.",
      tech: ["Java", "IoT", "Socket Programming", "Multi-Threading", "Sensor Telemetry"],
      architecture: {
        highlights: [
          "Multi-threaded TCP/IP socket listener capable of servicing concurrent IoT peripheral streams.",
          "Telemetry validation protocol ensuring sensor readings are authenticated prior to command execution.",
          "Event triggers for home automation based on live temperature, motion, and ambient light thresholds."
        ]
      }
    },
    {
      id: "server-py",
      name: "Server",
      title: "Multi-Threaded Socket Server & Network Daemon",
      category: "network-security",
      categoryName: "Network Security & Systems",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Server",
      live: null,
      summary: "Low-level Python network daemon handling raw TCP socket connections, concurrent client thread management, and security boundary checking.",
      tech: ["Python", "Socket Programming", "Multi-Threading", "TCP/IP", "Network Security"],
      architecture: {
        highlights: [
          "Implemented raw socket lifecycle management, non-blocking I/O polling, and payload boundary sanitization.",
          "Defensive programming preventing buffer overflow conditions and malformed packet crashes."
        ]
      }
    },
    {
      id: "websocket-realtime",
      name: "web_socket-reactjs-nodejs",
      title: "Full-Duplex Real-Time WebSocket Messaging Infrastructure",
      category: "backend-systems",
      categoryName: "Backend & Distributed",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/web_socket-reactjs-nodejs",
      live: null,
      summary: "Bidirectional real-time communication platform utilizing TypeScript, Node.js, and WebSocket protocol for low-latency state synchronization.",
      tech: ["TypeScript", "Node.js", "WebSockets", "React", "State Sync"],
      architecture: {
        highlights: [
          "Low-overhead heartbeat ping-pong mechanism maintaining persistent TCP socket connectivity.",
          "TypeScript type-safe event broadcasting preventing payload validation failures."
        ]
      }
    },
    {
      id: "qr-v2",
      name: "QR-code_V2",
      title: "Cloud QR Generation & Tracking Platform",
      category: "fullstack",
      categoryName: "Full-Stack Cloud Application",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/QR-code_V2",
      live: "https://qr-code-v2-brown.vercel.app",
      summary: "Interactive dynamic QR code generation web application deployed live on Vercel, paired with a custom Node.js backend for dynamic URL tracking.",
      tech: ["JavaScript", "Vercel", "REST APIs", "Cloud Deployment", "CSS3"],
      architecture: {
        highlights: [
          "Deployed live on Vercel edge infrastructure with sub-100ms global response times.",
          "Integrated dynamic SVG/Canvas QR rendering with customizable error correction levels."
        ]
      }
    },
    {
      id: "churn-predictor",
      name: "Telecomunication_company_customer_churn",
      title: "ML Predictive Telecom Churn Analytics Pipeline",
      category: "systems-iot",
      categoryName: "Data Science & Analytics",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Telecomunication_company_customer_churn",
      live: null,
      summary: "Machine learning analytical pipeline using logistic regression to evaluate customer attrition risk metrics based on contract duration, charges, and tenure.",
      tech: ["Python", "Jupyter Notebook", "Scikit-Learn", "Data Analytics", "Logistic Regression"],
      architecture: {
        highlights: [
          "Data cleaning, collinearity reduction, and categorical feature encoding on telecom datasets.",
          "Trained regularized logistic regression model producing probabilistic churn retention scores."
        ]
      }
    },
    {
      id: "social-media",
      name: "Social_mediaApp_2",
      title: "Scalable Full-Stack Social Interaction Engine",
      category: "fullstack",
      categoryName: "Full-Stack Application",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/Social_mediaApp_2",
      live: null,
      summary: "Full-stack social networking web application featuring session-based authentication, user feed algorithms, and reactive timeline updates.",
      tech: ["JavaScript", "Node.js", "Express", "RESTful API", "Frontend UI"],
      architecture: {
        highlights: [
          "Secure user authentication with salted hashing and session protection.",
          "Relational data model mapping user follow graphs and feed generation."
        ]
      }
    },
    {
      id: "expenz-flutter",
      name: "expenz",
      title: "Cross-Platform Personal Wealth & Expense Tracker",
      category: "fullstack",
      categoryName: "Mobile Engineering",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/expenz",
      live: null,
      summary: "Flutter mobile application for intuitive personal expense budgeting, transaction categorizing, and statistical spending visualization.",
      tech: ["Flutter", "Dart", "Mobile UI", "Local Persistence", "State Management"],
      architecture: {
        highlights: [
          "Single-codebase cross-platform mobile architecture with reactive UI components.",
          "Offline-first local database caching for immediate ledger responsiveness."
        ]
      }
    },
    {
      id: "qr-backend-new",
      name: "qr_backend_new",
      title: "High-Throughput QR Processing Backend Service",
      category: "backend-systems",
      categoryName: "Backend API",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/qr_backend_new",
      live: null,
      summary: "Dedicated Node.js backend microservice for QR code encryption, metadata binding, and redirect dispatching.",
      tech: ["Node.js", "Express", "REST API", "Payload Validation"],
      architecture: {
        highlights: ["Lightweight REST endpoints optimized for rapid QR payload translation."]
      }
    },
    {
      id: "labms-backend",
      name: "LabMS_Backend",
      title: "Laboratory Inventory & Resource Management Service",
      category: "backend-systems",
      categoryName: "Backend Architecture",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/LabMS_Backend",
      live: null,
      summary: "Backend management system for university laboratory equipment booking, user authorization roles, and audit logging.",
      tech: ["Node.js", "Express", "Database", "Access Control"],
      architecture: {
        highlights: ["Role-based access control (RBAC) separating student access from faculty admin powers."]
      }
    },
    {
      id: "cnn-vis",
      name: "CNN-vitulization",
      title: "Convolutional Neural Network Feature Map Visualizer",
      category: "systems-iot",
      categoryName: "Systems & Visualization",
      featured: false,
      stars: 0,
      forks: 0,
      github: "https://github.com/Thimira20/CNN-vitulization",
      live: null,
      summary: "Processing-based visual representation tool rendering hidden layer activations, convolutional kernels, and feature extraction stages.",
      tech: ["Processing", "Java", "Computer Vision", "Neural Networks"],
      architecture: {
        highlights: ["Visualizes multidimensional matrix transformations and activation filters in real-time."]
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
