/**
 * Unit tests for the action's main functionality, src/main.ts
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const infoMock = jest.spyOn(core, 'info')
const setFailedMock = jest.spyOn(core, 'setFailed')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets a failed status', async () => {
    const errorMessage = 'Info function failed'

    // Mock the log function to throw an error
    infoMock.mockImplementationOnce(() => {
      throw new Error(errorMessage)
    })

    // Verify that the function throws the expected error
    await expect(main.run()).resolves.toBeUndefined()

    // Verify that the setFailed function was called with the expected error message
    expect(setFailedMock).toHaveBeenNthCalledWith(1, errorMessage)
  })
})
