const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('./models/Service');
const Project = require('./models/Project');

const services = [
    { title: 'PLC Programming', description: 'Custom Programmable Logic Controller solutions designed for precise industrial process control, fault detection, and seamless integration with existing systems.', icon: 'Cpu' },
    { title: 'SCADA Systems', description: 'Real-time supervisory control and data acquisition systems that provide complete visibility and control over your entire industrial operation from a single interface.', icon: 'BarChart2' },
    { title: 'Robotics Integration', description: 'End-to-end robotic arm and automated machinery integration for manufacturing lines, improving throughput, precision, and worker safety.', icon: 'Bot' },
    { title: 'Industrial IoT', description: 'Connect your factory floor to the cloud with smart sensors, edge computing, and real-time analytics dashboards for data-driven decision making.', icon: 'Wifi' },
    { title: 'Process Automation', description: 'Full-scale automation of repetitive industrial processes — from material handling to quality inspection — reducing costs and eliminating human error.', icon: 'Settings' },
    { title: 'Energy Management', description: 'Smart energy monitoring and automated load-balancing systems that dramatically reduce your facility\'s energy consumption and operational costs.', icon: 'Zap' },
];

const projects = [
    {
        title: 'Smart Factory Automation — AutoParts Inc.',
        description: 'Deployed a full PLC-SCADA integration across 3 production lines, increasing throughput by 62% and reducing downtime by 40%.',
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&q=80',
        category: 'Manufacturing',
        link: '#',
    },
    {
        title: 'Water Treatment IoT System',
        description: 'Designed an Industrial IoT solution for real-time monitoring and automated chemical dosing across 5 water treatment plants.',
        image: 'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?w=600&q=80',
        category: 'Utilities',
        link: '#',
    },
    {
        title: 'Robotic Packaging Line — FoodCo',
        description: 'Integrated 12 robotic arms into an existing food packaging line, achieving 24/7 operation with 99.7% uptime reliability.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
        category: 'Food & Beverage',
        link: '#',
    },
    {
        title: 'Pharmaceutical Clean-Room Automation',
        description: 'Implemented fully compliant GMP automation for a clean-room environment, including real-time air quality and process monitoring.',
        image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&q=80',
        category: 'Pharmaceuticals',
        link: '#',
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        await Service.deleteMany();
        await Project.deleteMany();

        await Service.insertMany(services);
        await Project.insertMany(projects);

        console.log('✅ Sample data seeded successfully!');
        console.log(`   → ${services.length} services`);
        console.log(`   → ${projects.length} projects`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        process.exit(1);
    }
};

seed();
