import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('CLI Tool', () => {
  test('should have required CLI files', () => {
    assert(fs.existsSync('bin/index.js'));
    assert(fs.existsSync('package.json'));
    assert(fs.existsSync('README.md'));
  });

  test('should have valid package.json', () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    assert(packageJson.name === 'create-bankr-app');
    assert(packageJson.version);
    assert(packageJson.bin);
    assert(packageJson.scripts);
    assert(packageJson.dependencies);
  });

  test('should have all 10 templates', () => {
    const templates = [
      'trading-bot',
      'token-launcher', 
      'portfolio-tracker',
      'arbitrage-bot',
      'defi-yield-farm',
      'nft-marketplace',
      'cross-chain-bridge',
      'analytics-dashboard',
      'gamefi-platform',
      'defi-bank'
    ];

    templates.forEach(template => {
      const templatePath = path.join('templates', template);
      assert(fs.existsSync(templatePath), `Template ${template} should exist`);
      assert(fs.existsSync(path.join(templatePath, 'README.md')), `Template ${template} should have README`);
      assert(fs.existsSync(path.join(templatePath, 'package.json')), `Template ${template} should have package.json`);
    });
  });

  test('should have proper CLI structure', () => {
    const cliFile = fs.readFileSync('bin/index.js', 'utf8');
    
    // Check for key CLI features
    assert(cliFile.includes('Welcome to Create Bankr App'));
    assert(cliFile.includes('inquirer'));
    assert(cliFile.includes('templates'));
    assert(cliFile.includes('tutorialSteps'));
  });
});

describe('Documentation', () => {
  test('should have comprehensive documentation', () => {
    assert(fs.existsSync('README.md'));
    assert(fs.existsSync('CONTRIBUTING.md'));
    assert(fs.existsSync('TEMPLATES.md'));
    assert(fs.existsSync('PUBLISHING.md'));
    assert(fs.existsSync('NPM_PUBLISHING_GUIDE.md'));
  });

  test('should have proper npm configuration', () => {
    assert(fs.existsSync('.npmignore'));
    assert(fs.existsSync('.gitignore'));
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert(packageJson.repository);
    assert(packageJson.keywords);
    assert(packageJson.engines);
  });
});
