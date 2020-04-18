DROP DATABASE IF EXISTS jobcore;
CREATE DATABASE jobcore;
USE jobcore;

CREATE TABLE COMPANY(
	CompanyName  VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
	Modified     DATETIME     NOT NULL,
	HiringStatus ENUM('hiring', 'hiring freeze', 'offers rescinded')  NOT NULL,
	Comment      VARCHAR(500)
);

CREATE TABLE JOBDESCRIPTION (
    JobTitle            VARCHAR(50)   NOT NULL PRIMARY KEY UNIQUE,
    Salary              INT               NULL,
    JobResponsibilities VARCHAR(100)       NULL,
    TimeCommitment      INT               NULL,
    TypeOfContract      VARCHAR(50)       NULL,
    DateUpload          DATE          NOT NULL,
    ContractStart       DATE              NULL,
    ContactDuration     DATETIME          NULL,
    Link                VARCHAR(2048)     NULL             UNIQUE,
    CompanyName         VARCHAR(100)  NOT NULL,
    CONSTRAINT JobFK FOREIGN KEY (CompanyName)
        REFERENCES COMPANY (CompanyName),
    CHECK (TimeCommitment < 100
        && TimeCommitment > 0),
    CHECK (TypeOfContract = 'Intership'
        OR TypeOfContract = 'Contract'
        OR TypeOfContract = 'Employee')
);
