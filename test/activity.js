/* eslint-disable no-undef */
const assert = require('assert');
const path = require('path');
const { rm } = require('fs/promises');
const net = require('net');
const fsUtil = require('../util/fs');

const Process = require('../lib/process');
const Network = require('../lib/network');
const File = require('../lib/file');

describe('Activity', function () {
  describe('Process', function () {
    let process;
    beforeEach(async function () {
      process = new Process('ls -lah');
      await process.startProcess();
    });
    it('should return a substring of a command', function () {
      assert.strictEqual(process.processName, 'ls');
    });
    it('process name is not the full command', function () {
      assert.notStrictEqual(process.processName, process.cmd);
    });
    it('timestamp is of type Date', function () {
      assert.strictEqual(process.timestamp.constructor.name, 'Date');
    });
    it('pid returns an integer', function () {
      assert.ok(Number.isInteger(process.pid));
    });
  });

  describe('File creation', function () {
    let file;
    beforeEach(async function () {
      file = new File('test', 'create', '', './', 'csv');
      await file.startProcess();
    });
    it('timestamp is of type Date', function () {
      assert.strictEqual(file.timestamp.constructor.name, 'Date');
    });
    it('pid returns an integer', function () {
      assert.ok(Number.isInteger(file.pid));
    });
    it('absPath represents an absolute path', function () {
      assert.ok(path.isAbsolute(file.absPath));
    });
    it('extension is set', function () {
      assert.strictEqual(path.extname(file.absPath), '.csv');
    });
    afterEach(async function () {
      await rm('./test.csv');
    });
  });

  describe('File modification', function () {
    let file;
    beforeEach(async function () {
      file = new File('test', 'modify', 'Hello World!', './', 'txt');
      await file.startProcess();
    });
    it('file is modified with appended content', async function () {
      assert.strictEqual('Hello World!\n', await fsUtil.readFile('./test.txt'));
    });
    afterEach(async function () {
      await rm('./test.txt');
    });
  });

  describe('File deletion', function () {
    let file;
    beforeEach(async function () {
      file = new File('test', 'delete', '', './', 'json');
      await file.startProcess();
    });
    it('file is removed', async function () {
      assert.ok(!(await fsUtil.fileExists('./test.json')));
    });
  });

  describe('Network', function () {
    let network;
    before(async function () {
      network = new Network('https://hookb.in/E7lZGJLQZoHVjY66jbK8', 'This is a test');
      await network.makeRequest();
    });
    it('timestamp is of type Date', function () {
      assert.strictEqual(network.timestamp.constructor.name, 'Date');
    });
    it('source and destination address are valid IPs', async function () {
      assert.notStrictEqual(net.isIP(network.sourceAddress), 0);
      assert.notStrictEqual(net.isIP(network.destinationAddress), 0);
    });
    it('https protocol is returned', async function () {
      assert.strictEqual(network.protocol, 'https:');
    });
    it('integer values are returned for pid, ports, and byte size', function () {
      assert.ok(Number.isInteger(network.pid));
      assert.ok(Number.isInteger(network.dataBytesize));
      assert.ok(Number.isInteger(network.sourcePort));
      assert.ok(Number.isInteger(network.destinationPort));
    });
  });
});
