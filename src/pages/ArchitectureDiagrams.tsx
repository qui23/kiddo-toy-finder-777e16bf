import { useEffect } from "react";
import mermaid from "mermaid";

const diagrams = [
  {
    title: "1. Kiến Trúc Tổng Quan Hệ Thống",
    code: `flowchart TB
    subgraph Client["🖥️ Client (Browser)"]
        UI["React Components"]
        State["TanStack Query\\n(State Management)"]
        Router["React Router\\n(Navigation)"]
    end
    
    subgraph Frontend["⚛️ Frontend Layer"]
        Vite["Vite\\n(Build Tool)"]
        TS["TypeScript"]
        Tailwind["Tailwind CSS"]
        Shadcn["Shadcn/UI Components"]
    end
    
    subgraph Backend["☁️ Backend Layer (Supabase)"]
        Auth["Authentication"]
        API["REST API\\n(Auto-generated)"]
        Storage["File Storage"]
    end
    
    subgraph Database["🗄️ Database Layer"]
        PostgreSQL["PostgreSQL"]
        RLS["Row Level Security"]
    end
    
    Client --> Frontend
    Frontend --> Backend
    Backend --> Database`,
  },
  {
    title: "2. Kiến Trúc Frontend Chi Tiết",
    code: `flowchart LR
    subgraph Pages["📄 Pages"]
        Index["Index.tsx"]
        NotFound["NotFound.tsx"]
    end
    
    subgraph Components["🧩 Components"]
        UI["UI Components\\n(Button, Card, Dialog...)"]
        Custom["Custom Components\\n(NavLink...)"]
    end
    
    subgraph Hooks["🪝 Hooks"]
        UseToast["useToast"]
        UseMobile["useMobile"]
    end
    
    subgraph Lib["📚 Libraries"]
        Utils["utils.ts"]
        Supabase["Supabase Client"]
    end
    
    Pages --> Components
    Pages --> Hooks
    Components --> Lib
    Hooks --> Lib`,
  },
  {
    title: "3. Luồng Dữ Liệu (Data Flow)",
    code: `sequenceDiagram
    participant User as 👤 User
    participant React as ⚛️ React App
    participant Query as 📦 React Query
    participant Supabase as ☁️ Supabase
    participant DB as 🗄️ PostgreSQL
    
    User->>React: Truy cập trang
    React->>Query: Gọi useQuery
    Query->>Supabase: HTTP Request
    Supabase->>DB: SQL Query
    DB-->>Supabase: Data
    Supabase-->>Query: JSON Response
    Query-->>React: Cached Data
    React-->>User: Render UI`,
  },
  {
    title: "4. Cấu Trúc Thư Mục",
    code: `flowchart TD
    Root["📁 kiddo-toys-hub"]
    
    Root --> Src["📁 src"]
    Root --> Public["📁 public"]
    Root --> Docs["📁 docs"]
    
    Src --> Components["📁 components"]
    Src --> Pages["📁 pages"]
    Src --> Hooks["📁 hooks"]
    Src --> Lib["📁 lib"]
    Src --> Integrations["📁 integrations"]
    
    Components --> UIComponents["📁 ui\\n(Shadcn Components)"]
    Integrations --> SupabaseInt["📁 supabase\\n(Client Config)"]`,
  },
  {
    title: "5. Sơ Đồ Bảo Mật (Security Flow)",
    code: `flowchart TB
    subgraph Client["Client"]
        App["React App"]
    end
    
    subgraph Supabase["Supabase"]
        Auth["🔐 Authentication"]
        API["🔌 API Gateway"]
        RLS["🛡️ Row Level Security"]
    end
    
    subgraph DB["Database"]
        Tables["📊 Tables"]
    end
    
    App -->|"1. Login Request"| Auth
    Auth -->|"2. JWT Token"| App
    App -->|"3. API Request + JWT"| API
    API -->|"4. Verify Token"| Auth
    API -->|"5. Apply RLS Policies"| RLS
    RLS -->|"6. Filtered Query"| Tables
    Tables -->|"7. Data"| App`,
  },
  {
    title: "6. Component Architecture",
    code: `flowchart TB
    App["🏠 App.tsx"]
    
    App --> Providers["Providers"]
    Providers --> QueryProvider["QueryClientProvider"]
    Providers --> TooltipProvider["TooltipProvider"]
    Providers --> Router["BrowserRouter"]
    
    Router --> Routes["Routes"]
    Routes --> IndexPage["📄 Index"]
    Routes --> NotFoundPage["📄 NotFound"]
    
    IndexPage --> UIComponents["UI Components"]
    UIComponents --> Button["Button"]
    UIComponents --> Card["Card"]
    UIComponents --> Dialog["Dialog"]
    UIComponents --> More["..."]`,
  },
  {
    title: "7. Deployment Architecture",
    code: `flowchart LR
    subgraph Development["💻 Development"]
        Local["Local Dev\\n(Vite)"]
        GitHub["GitHub\\nRepository"]
    end
    
    subgraph Hosting["🌐 Hosting"]
        Lovable["Lovable\\nPlatform"]
        CDN["CDN\\n(Static Assets)"]
    end
    
    subgraph Backend["☁️ Backend"]
        SupabaseCloud["Supabase\\nCloud"]
    end
    
    Local -->|"Push"| GitHub
    GitHub -->|"Auto Deploy"| Lovable
    Lovable --> CDN
    Lovable <-->|"API Calls"| SupabaseCloud`,
  },
  {
    title: "8. ERD - Entity Relationship Diagram",
    code: `erDiagram
    USERS ||--o{ PROFILES : has
    USERS ||--o{ USER_ROLES : has
    USERS ||--o{ ORDERS : places
    USERS ||--o{ CART_ITEMS : has
    
    PROFILES {
        uuid id PK
        uuid user_id FK
        string first_name
        string last_name
        string avatar_url
        timestamp created_at
    }
    
    USER_ROLES {
        uuid id PK
        uuid user_id FK
        enum role
    }
    
    PRODUCTS ||--o{ CART_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : contains
    CATEGORIES ||--o{ PRODUCTS : has
    
    CATEGORIES {
        uuid id PK
        string name
        string description
        string image_url
        timestamp created_at
    }
    
    PRODUCTS {
        uuid id PK
        string name
        text description
        decimal price
        integer stock
        string image_url
        uuid category_id FK
        boolean is_featured
        timestamp created_at
    }
    
    CART_ITEMS {
        uuid id PK
        uuid user_id FK
        uuid product_id FK
        integer quantity
        timestamp created_at
    }
    
    ORDERS ||--|{ ORDER_ITEMS : contains
    
    ORDERS {
        uuid id PK
        uuid user_id FK
        decimal total_amount
        string status
        string shipping_address
        timestamp created_at
    }
    
    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        integer quantity
        decimal price
    }`,
  },
  {
    title: "9. Use Case Diagram",
    code: `flowchart TB
    subgraph Actors["👥 Actors"]
        Guest["🧑 Khách"]
        User["👤 Người dùng"]
        Admin["👨‍💼 Admin"]
    end
    
    subgraph GuestUC["Use Cases - Khách"]
        UC1["Xem sản phẩm"]
        UC2["Tìm kiếm"]
        UC3["Đăng ký/Đăng nhập"]
    end
    
    subgraph UserUC["Use Cases - Người dùng"]
        UC4["Giỏ hàng"]
        UC5["Đặt hàng"]
        UC6["Xem lịch sử"]
    end
    
    subgraph AdminUC["Use Cases - Admin"]
        UC7["Quản lý sản phẩm"]
        UC8["Quản lý đơn hàng"]
        UC9["Thống kê"]
    end
    
    Guest --> UC1
    Guest --> UC2
    Guest --> UC3
    
    User --> UC4
    User --> UC5
    User --> UC6
    
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9`,
  },
];

const ArchitectureDiagrams = () => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
    });
    mermaid.run();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Báo Cáo Kiến Trúc Hệ Thống
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">Kiddo Toys Hub</h2>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 print:hidden"
          >
            In PDF / Tải xuống
          </button>
          <p className="text-sm text-gray-500 mt-2 print:hidden">
            Nhấn nút trên hoặc Ctrl+P để in/lưu PDF
          </p>
        </div>

        <div className="space-y-8">
          {diagrams.map((diagram, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 bg-gray-50 break-inside-avoid"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {diagram.title}
              </h3>
              <div className="flex justify-center overflow-x-auto">
                <pre className="mermaid">{diagram.code}</pre>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 print:mt-4">
          <p>Tài liệu được tạo bởi Lovable AI - Ngày: 23/12/2024</p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagrams;
