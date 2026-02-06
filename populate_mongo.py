"""
Script to populate MongoDB Atlas with project and experience context for RAG.
Run this once to add all documents to the vector store.
"""
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_cohere.embeddings import CohereEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_core.documents import Document

load_dotenv()

# Documents to add to the knowledge base
DOCUMENTS = [
    # ===== WellX AI Experience =====
    Document(
        page_content="""Sharique Khatri's Software Engineering Internship at WellX AI (December 2025 – March 2026):

At WellX AI, Sharique builds backend systems for a digital health platform integrating real-time data from wearable devices including Fitbit, Apple Watch, and WHOOP. He develops ingestion pipelines and backend logic for user challenges and incentive workflows, ensuring accurate data processing and scalable reward distribution for 10,000+ users. This role has given him hands-on experience building production backend services in a fast-paced startup environment.

Key Responsibilities and Achievements:
- Engineered real-time ingestion pipelines integrating Fitbit, Apple Watch, and WHOOP wearable device data
- Designed activity verification and reward allocation workflows for user challenges
- Optimized backend services for reliability, scalability, and data integrity at scale for over 10,000 users
- Built production-ready backend systems in a startup environment

Technologies Used: LookerLM, SQL, Agile/Scrum, C, Ruby, System Architecture

This is Sharique's current position as of 2025-2026.""",
        metadata={"category": "experience", "company": "WellX AI", "role": "Software Engineering Intern"}
    ),
    
    # ===== Projects =====
    Document(
        page_content="""AI Travel Planner Project by Sharique Khatri:

A full-stack intelligent itinerary generator that uses Skyscanner and Weather APIs to identify optimal travel periods and locations with personalized AI recommendations.

Technologies: Python, LangChain, APIs, AI
GitHub: https://github.com/sharique2004/AITravelPlannar

Features:
- Integrates Skyscanner API for flight and travel data
- Uses Weather APIs to recommend optimal travel times
- Generates personalized AI-powered travel itineraries
- Full-stack application with modern web technologies""",
        metadata={"category": "project", "name": "AI Travel Planner", "technologies": ["Python", "LangChain", "APIs", "AI"]}
    ),
    
    Document(
        page_content="""GreenTrack Expo Project by Sharique Khatri:

An environmental sustainability tracking mobile application built with React Native and Expo to help users monitor and reduce their carbon footprint.

Technologies: JavaScript, React Native, Expo, Mobile Development
GitHub: https://github.com/sharique2004/GreenTrackExpo

Features:
- Mobile app for tracking environmental impact
- Carbon footprint monitoring and reduction tips
- Built with React Native for cross-platform support
- Uses Expo framework for rapid development""",
        metadata={"category": "project", "name": "GreenTrack Expo", "technologies": ["JavaScript", "React Native", "Expo"]}
    ),
    
    Document(
        page_content="""VaultCache Project by Sharique Khatri:

A secure caching solution with encrypted storage capabilities, providing fast data access while maintaining security and privacy standards.

Technologies: Security, Caching, Encryption
GitHub: https://github.com/sharique2004/vaultcache

Features:
- Encrypted storage for sensitive cached data
- Fast data access with security focus
- Privacy-first design principles
- Secure caching mechanisms""",
        metadata={"category": "project", "name": "VaultCache", "technologies": ["Security", "Caching", "Encryption"]}
    ),
    
    Document(
        page_content="""Personal Work Tracker Project by Sharique Khatri:

A productivity application to track personal tasks, work progress, and time management with intuitive dashboard and analytics.

Technologies: JavaScript, Full-Stack Development, Dashboard
GitHub: https://github.com/sharique2004/personal-work-tracker

Features:
- Task tracking and management
- Work progress monitoring
- Time management features
- Intuitive dashboard with analytics
- Full-stack web application""",
        metadata={"category": "project", "name": "Personal Work Tracker", "technologies": ["JavaScript", "Full-Stack"]}
    ),
    
    Document(
        page_content="""Multi-Level Cache System Project by Sharique Khatri:

An advanced caching system implementing MRU (Most Recently Used) and LRU (Least Recently Used) eviction policies with multi-level hierarchy for optimized memory management.

Technologies: Python, Data Structures, Algorithms
GitHub: https://github.com/sharique2004/Multi-Level-Cache-System-with-MRU-LRU-Eviction-Policies

Features:
- Multi-level cache hierarchy
- MRU eviction policy implementation
- LRU eviction policy implementation
- Optimized memory management
- Advanced data structures knowledge""",
        metadata={"category": "project", "name": "Multi-Level Cache System", "technologies": ["Python", "Data Structures", "Algorithms"]}
    ),
    
    Document(
        page_content="""Pipelined MIPS Processor Project by Sharique Khatri:

A hardware implementation of a 5-stage pipelined MIPS processor datapath with hazard detection and forwarding units.

Technologies: Verilog, Computer Architecture, HDL (Hardware Description Language)
GitHub: https://github.com/sharique2004/Pipelined-MIPS-Processor-Datapath-Implementation

Features:
- 5-stage pipeline implementation (IF, ID, EX, MEM, WB)
- Hazard detection unit
- Forwarding unit for data hazards
- Complete MIPS datapath
- Hardware description in Verilog""",
        metadata={"category": "project", "name": "Pipelined MIPS Processor", "technologies": ["Verilog", "Computer Architecture", "HDL"]}
    ),
    
    Document(
        page_content="""RSA Cryptosystem Project by Sharique Khatri:

A complete RSA encryption implementation from scratch without external libraries, featuring key generation, encryption and decryption.

Technologies: Python, Cryptography, Mathematics
GitHub: https://github.com/sharique2004/Manual-RSA-Cryptosystem-A-From-Scratch-Implementation-Without-External-Libraries

Features:
- RSA key generation from scratch
- Encryption implementation
- Decryption implementation
- No external cryptography libraries used
- Mathematical foundations of RSA""",
        metadata={"category": "project", "name": "RSA Cryptosystem", "technologies": ["Python", "Cryptography", "Mathematics"]}
    ),
    
    Document(
        page_content="""Schedule Builder Project by Sharique Khatri:

An intelligent course scheduling application that helps students plan their academic schedule with conflict detection and optimization.

Technologies: Java, Algorithms, UI/UX
GitHub: https://github.com/sharique2004/ScheduleBuilder

Features:
- Course schedule planning
- Conflict detection between courses
- Schedule optimization algorithms
- User-friendly interface
- Academic planning tool for students""",
        metadata={"category": "project", "name": "Schedule Builder", "technologies": ["Java", "Algorithms", "UI/UX"]}
    ),
    
    Document(
        page_content="""Custom Parser Project by Sharique Khatri:

A comprehensive lexer and parser for a programming language with tokenization, syntax validation, scoping, and type checking.

Technologies: Python, Compiler Design, Parsing
GitHub: https://github.com/sharique2004/Parser

Features:
- Lexical analysis (tokenization)
- Syntax validation
- Scoping rules implementation
- Type checking
- Full parser implementation for programming language
- Compiler design principles""",
        metadata={"category": "project", "name": "Custom Parser", "technologies": ["Python", "Compiler Design", "Parsing"]}
    ),
    
    Document(
        page_content="""Disk Read/Write Project by Sharique Khatri:

Low-level disk I/O operations implementation in C for efficient file system interactions and block-level data management.

Technologies: C, Systems Programming, I/O
GitHub: https://github.com/sharique2004/Disk-Read-Write

Features:
- Low-level disk I/O operations
- Block-level data management
- Efficient file system interactions
- Systems programming in C
- Direct disk access and manipulation""",
        metadata={"category": "project", "name": "Disk Read/Write", "technologies": ["C", "Systems Programming", "I/O"]}
    ),
]


def main():
    """Main function to populate MongoDB with documents."""
    cohere_key = os.getenv("COHERE_API_KEY")
    atlas_uri = os.getenv("ATLAS_CONNECTION_STRING")
    
    if not cohere_key:
        print("ERROR: COHERE_API_KEY not found in environment variables")
        return
    if not atlas_uri:
        print("ERROR: ATLAS_CONNECTION_STRING not found in environment variables")
        return
    
    print("Connecting to MongoDB Atlas...")
    mongo_client = MongoClient(host=atlas_uri)
    mywebsite_db = mongo_client["mywebsite"]
    mybio_collection = mywebsite_db["mybio"]
    
    print("Initializing Cohere embeddings...")
    embeddings = CohereEmbeddings(
        cohere_api_key=cohere_key,
        model="embed-english-v3.0",
    )
    
    print("Setting up vector store...")
    vectorstore = MongoDBAtlasVectorSearch(
        collection=mybio_collection,
        embedding=embeddings,
        index_name="bio_index",
    )
    
    print(f"\nAdding {len(DOCUMENTS)} documents to MongoDB...")
    
    # Add documents one by one with progress
    for i, doc in enumerate(DOCUMENTS, 1):
        try:
            vectorstore.add_documents([doc])
            category = doc.metadata.get("category", "unknown")
            name = doc.metadata.get("name") or doc.metadata.get("company") or "N/A"
            print(f"  [{i}/{len(DOCUMENTS)}] Added: {category} - {name}")
        except Exception as e:
            print(f"  [{i}/{len(DOCUMENTS)}] ERROR adding document: {e}")
    
    print("\n✅ Done! All documents have been added to MongoDB Atlas.")
    print("You can now ask the AI about your WellX AI experience and projects.")


if __name__ == "__main__":
    main()
