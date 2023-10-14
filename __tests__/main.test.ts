/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug')
const getInputMock = jest.spyOn(core, 'getInput')
const setOutputMock = jest.spyOn(core, 'setOutput')
const setFailedMock = jest.spyOn(core, 'setFailed')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Other utilities
const timeRegex = /^\d{2}:\d{2}:\d{2}/

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the time output', async () => {
    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that the time output was set correctly
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'time',
      expect.stringMatching(timeRegex)
    )
  })

  it('sets a failed status', async () => {
    const errorMessage = 'Set output function failed'

    // Mock the setOutput function to throw an error
    setOutputMock.mockImplementationOnce(() => {
      throw new Error(errorMessage)
    })

    // Verify that the function throws the expected error
    await expect(main.run()).resolves.toBeUndefined()

    // Verify that the setFailed function was called with the expected error message
    expect(setFailedMock).toHaveBeenNthCalledWith(1, errorMessage)
  })
})
