
type ComponentDetail = {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
};

export const componentDetails: Record<string, ComponentDetail> = {
  trafficManager: {
    title: 'Azure Traffic Manager',
    description: 'Global DNS-based traffic load balancer that distributes traffic across Azure regions.',
    features: [
      'Priority routing for active-passive failover',
      'Weighted round-robin distribution',
      'Performance-based routing to nearest endpoint',
      'Geographic routing to specific endpoints by location'
    ],
    benefits: [
      'Ensures high availability across multiple regions',
      'Improves application responsiveness',
      'Enables disaster recovery scenarios',
      'No downtime during region failover'
    ]
  },
  
  waf: {
    title: 'Web Application Firewall',
    description: 'Protects web applications from common exploits and vulnerabilities.',
    features: [
      'OWASP top 10 protection rules',
      'Custom rule configuration',
      'Bot protection capabilities',
      'DDoS protection'
    ],
    benefits: [
      'Prevents SQL injection and cross-site scripting attacks',
      'Blocks malicious traffic before reaching application',
      'Centrally managed security policy',
      'Real-time security monitoring'
    ]
  },
  
  frontendScaleSet: {
    title: 'App Service Scale Set',
    description: 'Scalable platform for hosting frontend web applications with auto-scaling capabilities.',
    features: [
      'Automatic horizontal scaling',
      'Deployment slots for zero-downtime updates',
      'Built-in load balancing',
      'Zone redundancy for high availability'
    ],
    benefits: [
      'Handles 1000 RPS with dynamic scaling',
      'Minimizes infrastructure management overhead',
      'Supports CI/CD integration',
      'Optimized cost with scale-to-zero capability'
    ]
  },
  
  apiManagement: {
    title: 'API Management',
    description: 'Fully managed service for publishing, securing, transforming, and analyzing APIs.',
    features: [
      'API versioning and lifecycle management',
      'Request/response transformation',
      'Rate limiting and quotas',
      'OAuth 2.0 and JWT validation'
    ],
    benefits: [
      'Centralizes API governance',
      'Provides developer portal for API documentation',
      'Enables detailed API analytics',
      'Secures access to backend services'
    ]
  },
  
  backendScaleSet: {
    title: 'Backend Service Scale Set',
    description: 'Scalable compute resources for hosting backend microservices and application logic.',
    features: [
      'Container orchestration with AKS',
      'Pod auto-scaling based on metrics',
      'Service mesh integration',
      'Multi-zone deployment'
    ],
    benefits: [
      'Efficiently processes 1000 RPS workloads',
      'Ensures fault tolerance through pod distribution',
      'Enables blue/green and canary deployments',
      'Optimizes resource utilization'
    ]
  },
  
  sqlDbPrimary: {
    title: 'Azure SQL Primary',
    description: 'Primary SQL Database instance with high performance and security capabilities.',
    features: [
      'Automated backups and point-in-time restore',
      'Advanced threat protection',
      'Transparent data encryption',
      'Geo-replication to secondary region'
    ],
    benefits: [
      'Handles high transaction workloads',
      'Built-in high availability',
      'Automated patching and updates',
      'Comprehensive security features'
    ]
  },
  
  sqlDbSecondary: {
    title: 'Azure SQL Secondary',
    description: 'Geo-replicated secondary database for disaster recovery and read workloads.',
    features: [
      'Asynchronous replication from primary',
      'Automatic failover groups',
      'Read-only access for reporting workloads',
      'Geo-redundant backups'
    ],
    benefits: [
      'Improves application resiliency',
      'Distributes read workloads',
      'Enables business continuity',
      'Minimal data loss during region failure'
    ]
  },
  
  keyvault: {
    title: 'Azure Key Vault',
    description: 'Secure storage for application secrets, keys, and certificates.',
    features: [
      'Hardware Security Module (HSM) backed keys',
      'Certificate management and auto-renewal',
      'Role-based access control',
      'Integration with Azure AD'
    ],
    benefits: [
      'Centralizes secret management',
      'Prevents hard-coded credentials',
      'Provides audit logging of secret access',
      'Simplifies key rotation'
    ]
  },
  
  monitor: {
    title: 'Azure Monitor',
    description: 'Comprehensive solution for collecting, analyzing, and acting on telemetry from applications and infrastructure.',
    features: [
      'Application Insights integration',
      'Log Analytics capabilities',
      'Metric-based alerting',
      'Customizable dashboards'
    ],
    benefits: [
      'Real-time visibility into system health',
      'Advanced analytics for troubleshooting',
      'Proactive alerting for potential issues',
      'End-to-end transaction monitoring'
    ]
  },
  
  externalServices: {
    title: 'External Services',
    description: 'Integration with third-party services and APIs required by the application.',
    features: [
      'Secure service-to-service communication',
      'Circuit breaker patterns',
      'Retry policies with exponential backoff',
      'API throttling and rate limiting'
    ],
    benefits: [
      'Extends application capabilities',
      'Handles external service failures gracefully',
      'Manages third-party rate limits',
      'Provides consistent integration patterns'
    ]
  }
};
